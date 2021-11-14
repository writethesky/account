import http from "@/http";
import store from "@/store";

const token = {
    has() {
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
    delete() {
        localStorage.removeItem("token")
        store.commit("set_token", {
            token: "",
            expire: ""
        })
    },
    create(username: string, password: string) {
        return new Promise((resolve, reject) => {
            http.post("tokens", {
                "password": password,
                "username": username,
            }).then(function (response: any) {
                store.commit("set_token", response)
                localStorage.setItem("token", JSON.stringify(response))
                localStorage.setItem("username", username)
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
            })
        })


    }
}

export default token