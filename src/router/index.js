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
            path:'/home',      // 首页
            component:Home,
            meta:{show:true}
        },
        {
            path:'/login',     //登录页
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',   //注册页
            component:Register,
            meta:{show:false}
        },
        {
            path:'/search',    //搜索页
            component:Search,
            meta:{show:true}
        },
        // 重定向，在项目跑起来的时候，访问 ./ 立马让它定向到首页
        {
            path:'*',
            redirect:'/Home'
        }
    ]
})