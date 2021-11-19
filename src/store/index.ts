import {createStore} from 'vuex'
import {nextTick} from 'vue';

export interface AlertMessage {
    type: string
    message: string
}

export default createStore({
    state: {
        context: <any>{},
        alert_handle: 0,
        alert_message: "",
        alert_type: "",
        alert_show_time: 5,
        is_init_account_list: false,
        token: {
            token: "",
            expire: "",
        },
        isSecure: false,
    },
    mutations: {
        set_token(state, token) {
            state.token = token
        },
        setSecure(state, isSecure) {
            state.isSecure = isSecure
        },
        setContext(state, obj) {
            state.context[obj.requestID] = obj.ivBuffer
        },
        async alert(state: any, message: AlertMessage) {
            clearInterval(state.alert_handle)
            state.alert_message = ""
            await nextTick()
            setTimeout(() => {
                state.alert_message = message.message
                state.alert_type = message.type
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