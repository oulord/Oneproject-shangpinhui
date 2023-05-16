// 对所有的 API 接口进行管理
import requests from './request'
import mockRequests from './mockAjax'

//三级联动的接口
// /api/product/getBaseCategoryList  是一个get请求，无参数
export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get(`/banner`)

// 获取floor数据
export const reqFloorList = () => mockRequests.get(`/floor`)

// 搜索模块的数据 地址：/api/list 方式：post 请求需要带参数
// 注意！当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "post",
    data: params
})

// 获取产品详情信息的接口 URL：/api/item/{skuId}  请求方式：get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据接口
// /api/cart/cartList  GET
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物产品的接口
// /api/cart/deleteCart/{skuId}   DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}   GET
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码
// /api/user/passport/sendCode/{phone}  GET
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册
// /api/user/passport/register   POST 
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data: data, method: 'post' })

// 登录
// /api/user/passport/login  POST 
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data: data, method: 'post' })

// 获取用户的信息，需要带着用户的token向服务器要用户信息  通过请求头添加
// http://182.92.128.115/api/user/passport/auth/getUserInfo   GET
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录
// /api/user/passport/logout  GET 
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList  GET
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取用户订单交易页信息
// /api/order/auth/trade  GET
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })


