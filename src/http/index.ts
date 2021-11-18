import axios from "axios";
import store from "@/store";

const http = axios.create({
    timeout: 3000,
})

let sessionID: string
let transferKey: CryptoKey
const pemEncodedPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAteTMyufB3I0bLWoJzeKG
PjtHNQg7ZUTn/+8LUTxRLxCUB8L5qH/twp13U2meiVYMDP5MbEmtjHaeqrCWEdyA
ouCTg1Ip+XPnfdOKx+/xc4dEh9lKBOi2aYprKvQvm3OGJkXT7D7N7non4bToCZab
ohH9CWbrWtIj7+AEXAjWUxrLsJ814gZs7tN7I8RMbCUJ+JrJFliE9FQeiHlDGgEq
8T4ha2UtrVg6TOC2RLK6zsS1E3g/hRoXHLUyEm/Z141U4a07/uOE59rECe6L+Duw
x34Un2wqqVQeYihK/NEsuAZdNXzRQofujw/5edfs8FdW33nML0WQl69e6J+IKLdz
ZQIDAQAB
-----END PUBLIC KEY-----`;

function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function ab2str(buf: ArrayBuffer): string {
    let str = ""
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = bufView.length; i < strLen; i++) {
        str += String.fromCharCode(bufView[i])
    }
    return str;
}

function importPublicKey(publicPem: string): Promise<CryptoKey> {
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = publicPem.substring(pemHeader.length, publicPem.length - pemFooter.length);

    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);

    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    const algorithm: RsaHashedImportParams = {
        name: "RSA-OAEP",
        hash: "SHA-256"
    }
    return crypto.subtle.importKey(
        "spki",
        binaryDer,
        algorithm,
        true,
        ["encrypt"]
    );
}

async function rsaEncrypt(key: CryptoKey, message: ArrayBuffer) {
    return await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        key,
        message
    )
}

async function generateTransferKey() {
    if (typeof (transferKey) != 'undefined') {
        return
    }
    transferKey = await crypto.subtle.generateKey({name: 'AES-GCM', length: 128}, true, ['encrypt', 'decrypt'])
}

async function sendTransferKey() {
    const publicKey = await importPublicKey(pemEncodedPublicKey)
    const transferKeyBuffer = await window.crypto.subtle.exportKey("raw", transferKey)
    const encryptTransferKey = await rsaEncrypt(publicKey, transferKeyBuffer)
    const res = await axios.post(process.env.VUE_APP_API_URL + "/secures", encryptTransferKey)
    sessionID = res.data
}

function buf2hex(buffer: Uint8Array) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

http.interceptors.request.use(async (config) => {
    const {url} = config;
    const requestID = btoa(ab2str(crypto.getRandomValues(new Uint8Array(32))))

    config = {
        ...config,
        baseURL: process.env.VUE_APP_API_URL,
        url: url,
        headers: {
            "Request-ID": requestID,
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            ...config.headers,
            Authorization: "token " + store.state.token.token,
        }
    }

    if (store.state.isSecure) {
        if (typeof (sessionID) == 'undefined') {
            await generateTransferKey()
            await sendTransferKey()
        }

        const ivBuffer = await crypto.getRandomValues(new Uint8Array(12))
        store.commit("setContext", {
            requestID,
            ivBuffer
        })

        config.headers!.Security = sessionID
        config.headers!.Nonce = buf2hex(ivBuffer)
        config.responseType = "arraybuffer"

        config.data = await crypto.subtle.encrypt({
            name: 'AES-GCM',
            iv: ivBuffer
        }, transferKey, new TextEncoder().encode(JSON.stringify(config.data)))

    }

    return config
}, (error => {
    return Promise.reject(error)
}))

http.interceptors.response.use(async res => {
    const data = await getResponseData(res.config.headers!["Request-ID"], res.data)
    return Promise.resolve(data)
}, async err => {
    err.response.data = await getResponseData(err.config.headers["Request-ID"], err.response.data)
    return Promise.reject(err)
})

async function getResponseData(requestID: string, data: any): Promise<any> {
    if (store.state.isSecure) {
        if (data.byteLength == 0) {
            return ""
        }
        const ivBuffer = store.state.context[requestID]
        const resBody = await crypto.subtle.decrypt({
            name: 'AES-GCM',
            iv: ivBuffer
        }, transferKey, data)
        if (resBody.byteLength == 0) {
            return ""
        }
        return JSON.parse(new TextDecoder().decode(resBody))
    }
    return data
}

export default http