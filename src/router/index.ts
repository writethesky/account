import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
        path: '/detail/:type/:id?',
        name: 'Detail',
        component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
    },
    {
        path: '/lock',
        name: 'Lock',
        component: () => import(/* webpackChunkName: "about" */ '../views/Lock.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
