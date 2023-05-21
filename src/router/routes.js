// 引入一级路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

// 路由配置信息
export default [
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { isShow: true },
        // 二级路由组件
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: MyOrder
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        name: 'paysuccess',
        path: '/PaySuccess',
        component: PaySuccess,
        meta: { isShow: true }
    },
    {
        name: 'Pay',
        path: '/pay',
        component: Pay,
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            if (from.path = "/trade") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: "trade",
        path: '/trade',
        component: Trade,
        meta: { isShow: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if (from.path == "/shopcart") {
                next()
            } else {
                // 其他组件而来，则停留在当前
                next(false)
            }
        }
    },
    {
        name: "shopcart",
        path: '/shopcart',
        component: ShopCart,
        meta: { isShow: true }
    },
    {
        name: "addcartsuccess",
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { isShow: true }
    },
    {
        name: "detail",
        path: '/detail/:skuid',
        component: Detail,
        meta: { isShow: true }
    },
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
        path: '/search/:keyword?',    //搜索页，接收参数进行占位
        component: Search,
        meta: { show: true }
    },
    // 重定向，在项目跑起来的时候，访问 ./ 立马让它定向到首页
    {
        path: '*',
        redirect: '/Home'
    }
]