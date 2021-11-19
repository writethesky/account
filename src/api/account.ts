import http from "@/http";
import store from "@/store";
import {Account} from "@/type";

const account = {
    list(): Promise<Account[]> {
        return new Promise((resolve, reject) => {
            http.get("accounts").then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
                reject(err)
            })
        })
    },
    info(id: number): Promise<Account> {
        return new Promise((resolve, reject) => {
            http.get("accounts/" + id).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
                reject(err)
            })
        })
    },
    edit(account: Account) {
        return new Promise((resolve, reject) => {
            http.put("accounts/" + account.id, account).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
                reject(err)
            })
        })
    },
    delete(id: number) {
        return new Promise((resolve, reject) => {
            http.delete("accounts/" + id).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
                reject(err)
            })
        })
    },
    create(account: Account) {
        return new Promise((resolve, reject) => {
            http.post("accounts", account).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
                reject(err)
            })
        })
    }
}

export default account