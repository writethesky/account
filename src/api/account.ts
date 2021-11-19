import http from "@/http";
import store from "@/store";
import {Account} from "@/type";

const account = {
    list(): Promise<Account[]> {
        return new Promise((resolve, reject) => {
            http.get("accounts").then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", {
                    "type": "error",
                    "message": err.response.data.message,
                })
                reject(err)
            })
        })
    },
    info(id: number): Promise<Account> {
        return new Promise((resolve, reject) => {
            http.get("accounts/" + id).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", {
                    "type": "error",
                    "message": err.response.data.message,
                })
                reject(err)
            })
        })
    },
    edit(account: Account): Promise<any> {
        return new Promise((resolve, reject) => {
            http.put("accounts/" + account.id, account).then(function (response: any) {
                resolve(response)
                store.commit("alert", {
                    "type": "success",
                    "message": "has been modified"
                })
            }).catch(function (err: any) {
                store.commit("alert", {
                    "type": "error",
                    "message": err.response.data.message,
                })
                reject(err)
            })
        })
    },
    delete(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            http.delete("accounts/" + id).then(function (response: any) {
                resolve(response)
                store.commit("alert", {
                    "type": "success",
                    "message": "has been deleted"
                })
            }).catch(function (err: any) {
                store.commit("alert", {
                    "type": "error",
                    "message": err.response.data.message,
                })
                reject(err)
            })
        })
    },
    create(account: Account) {
        return new Promise((resolve, reject) => {
            http.post("accounts", account).then(function (response: any) {
                store.commit("alert", {
                    "type": "success",
                    "message": "created",
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

export default account