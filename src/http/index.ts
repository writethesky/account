import axios from "axios";
import store from "@/store";

const http = axios.create({
    timeout: 3000,
})

http.interceptors.request.use((config) => {
    const {url} = config;
    config = {
        ...config,
        baseURL: process.env.VUE_APP_API_URL,
        url: url,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            ...config.headers,
            Authorization: "token " + store.state.token.token,
        }
    }
    return config
}, (error => {
    return Promise.reject(error)
}))

http.interceptors.response.use(res => {
    return res.data
})
export default http