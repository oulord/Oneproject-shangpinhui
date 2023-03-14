import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

export default new VueRouter({
    routes: [
        {
            name:"home",
            path: '/home',      // 首页
            component: Home,
            meta: { show: true }
        },
        {
            name:"login",
            path: '/login',     //登录页
            component: Login,
            meta: { show: false }
        },
        {
            name:"register",
            path: '/register',   //注册页
            component: Register,
            meta: { show: false }
        },
        {
            name:"search",
            path: '/search/:keyword',    //搜索页，接收参数进行占位
            component: Search,
            meta: { show: true }
        },
        // 重定向，在项目跑起来的时候，访问 ./ 立马让它定向到首页
        {
            path: '*',
            redirect: '/Home'
        }
    ]
})