import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由配置
import routes from '@/router/routes'
// 引入store
import store from '@/store'
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

let router = new VueRouter({
    // key 和 value 一致可以省略
    // routes:routes
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局路由守卫：前置守卫（在路由跳转之间进行判断
router.beforeEach(async (to, from, next) => {
    // 用户登录了，才有token，未登录不会有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    // 用户已登录
    if (token) {
        // 用户已登录，就不能再去login页面
        if (to.path == '/login') {
            next('/')
        } else {
            // 登录了，但是去其它组件
            // 如果用户名有
            if (name) {
                next()
            } else {
                // 没有用户名，派发action让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // 登录后，但超过token的请求时间，需重新登录
                    // 1、清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
})

export default router