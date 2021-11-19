import http from "@/http";
import store from "@/store";

const token = {
    has(): boolean {
        const localToken = localStorage.getItem("token")
        if (!localToken) {
            return false
        }
        const token_info = JSON.parse(localToken)

        if (!Object.prototype.hasOwnProperty.call(token_info, "token") || !Object.prototype.hasOwnProperty.call(token_info, "expire")) {
            return false
        }
        const isExpire = (new Date(token_info.expire).getTime() - new Date().getTime()) / 1000 / 60 / 60 > 1
        if (isExpire) {
            store.commit("set_token", token_info)
        }
        return isExpire

    },
    delete(): void {
        localStorage.removeItem("token")
        store.commit("set_token", {
            token: "",
            expire: ""
        })
    },
    create(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            http.post("tokens", {
                "password": password,
                "username": username,
            }).then(function (response: any) {
                store.commit("set_token", response)
                localStorage.setItem("token", JSON.stringify(response))
                localStorage.setItem("username", username)
                store.commit("alert", {
                    "type": "success",
                    "message": "login successfully",
                })
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", {
                    "type": "error",
                    "message": err.response.data.message,
                })
                reject(err)
            })
        })


    }
}

export default token