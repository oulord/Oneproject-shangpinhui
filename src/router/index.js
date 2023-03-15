import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

// 先把VueRouter 原型对象的 push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写 push | replace 
// 第一个参数：告诉原来的 push 方法，你往哪里跳转（传递那些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call 与 apply 的区别
        // 相同点：都可以调用一次函数，都可以篡改函数的上下文一次
        // 不同点：call 与 apply 传递参数：call 传递参数用逗号隔开，apply 方法执行，传递数组
        originPush.cal(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // call 与 apply 的区别
        // 相同点：都可以调用一次函数，都可以篡改函数的上下文一次
        // 不同点：call 与 apply 传递参数：call 传递参数用逗号隔开，apply 方法执行，传递数组
        originReplace.cal(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { })
    }
}

export default new VueRouter({
    routes: [
        {
            name: "home",
            path: '/home',      // 首页
            component: Home,
            meta: { show: true }
        },
        {
            name: "login",
            path: '/login',     //登录页
            component: Login,
            meta: { show: false }
        },
        {
            name: "register",
            path: '/register',   //注册页
            component: Register,
            meta: { show: false }
        },
        {
            name: "search",
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