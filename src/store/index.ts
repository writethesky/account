import {createStore} from 'vuex'
import {nextTick} from 'vue';
import {Buffer} from "buffer";


export default createStore({
    state: {
        account_list: <Account[]>[],
        alert_handle: 0,
        alert_message: "",
        alert_show_time: 5,
        is_init_account_list: false,
        token: {
            token: "",
            expire: "",
        },
    },
    mutations: {
        set_token(state, token) {
            state.token = token
        },
        async alert(state, message: string) {
            clearInterval(state.alert_handle)
            state.alert_message = ""
            await nextTick()
            setTimeout(() => {
                state.alert_message = message
                state.alert_handle = loop()

                function loop(): number {
                    return setInterval(() => {
                        state.alert_message = ""
                    }, state.alert_show_time * 1000)

                }
            }, 0)


        }
    },
    actions: {},
    modules: {}
})
init().then(async () => {
    // const a = await encrypt({a: "你好"})
    // console.log(a)
    // const b = await decrypt(a)
    // console.log(b)

})
let aes_key: CryptoKey
let iv: Uint8Array

async function init() {

    let aes_key_string = localStorage.getItem("AES")
    if (!aes_key_string) {
        // 生成AES key
        const key = await crypto.subtle.generateKey({
            name: "AES-CBC",
            length: 256
        }, true, ["encrypt", "decrypt"])
        const jwk = await crypto.subtle.exportKey('jwk', key)
        if (!jwk.k) {
            return
        }
        localStorage.setItem("AES", jwk.k)
        aes_key_string = jwk.k

    }

    const iv_string = localStorage.getItem('iv')
    if (iv_string) {
        iv = Buffer.from(iv_string, 'base64')
    }


    aes_key = await crypto.subtle.importKey('jwk', {
        k: aes_key_string,
        kty: "oct",
    }, {
        name: "AES-CBC",
        length: 256
    }, true, ["encrypt", "decrypt"])

}

async function encrypt(data: any): Promise<string> {
    const dataString = JSON.stringify(data)
    const encoder = new TextEncoder()
    const dataBytes = encoder.encode(dataString)

    iv = new Uint8Array(16)
    crypto.getRandomValues(iv)
    localStorage.setItem('iv', Buffer.from(iv).toString('base64'))

    const result = await crypto.subtle.encrypt({"name": "AES-CBC", iv}, aes_key, dataBytes)

    return Buffer.from(result).toString("base64")
}

async function decrypt(data: string): Promise<any> {
    const decoder = new TextDecoder()
    const dataBytes = Buffer.from(data, "base64")
    const result = await crypto.subtle.decrypt({"name": "AES-CBC", iv}, aes_key, dataBytes)
    return JSON.parse(decoder.decode(result))
}