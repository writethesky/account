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
            })
        })
    },
    info(id: number): Promise<Account> {
        return new Promise((resolve, reject) => {
            http.get("accounts/" + id).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
            })
        })
    },
    edit(id: number, title: string, type: number, data: any) {
        return new Promise((resolve, reject) => {
            http.put("accounts/" + id, {
                "title": title,
                "type": type,
                "data": data,
            }).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
            })
        })
    },
    delete(id: number) {
        return new Promise((resolve, reject) => {
            http.delete("accounts/" + id).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
            })
        })
    },
    create(title: string, type: number, data: any) {
        return new Promise((resolve, reject) => {
            http.post("accounts", {
                "title": title,
                "type": type,
                "data": data,
            }).then(function (response: any) {
                resolve(response)
            }).catch(function (err: any) {
                store.commit("alert", err.response.data.message)
            })
        })
    }
}

export default account