import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由配置
import routes from '@/router/routes'

Vue.use(VueRouter)

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
    // key 和 value 一致可以省略
    // routes:routes
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})