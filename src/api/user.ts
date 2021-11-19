import http from "@/http";
import store from "@/store";

const user = {
    create(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            http.post("users", {
                "password": password,
                "username": username,
            }).then(function (response: any) {
                store.commit("alert", "Registered successfully")
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
                reject(err)
            })
        })
    },
    changePassword(password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (password == "") {
                return
            }
            http.patch("users/0", {
                "password": password,
            }).then(function (response: any) {
                store.commit("alert", "Change successfully")
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
                reject(err)
            })
        })
    }
}

export default user