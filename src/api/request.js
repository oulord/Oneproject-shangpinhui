// 对于axios进行二次封装
import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
// 在 nprogress 中有两个方法，start()：进度条开始，done()：进度条结束
// 引入进度条样式
import "nprogress/nprogress.css"

// 在当前模块中引入store
import store from '@/store'

// 1、利用axios对象的方法 create，去创建axios实例
const requests = axios.create({
    // 配置对象
    baseURL: "/api",  //基础路径，发请求的时候，路径当中会出现api
    timeout: 5000,        //代表请求超时的时间
})

// 请求拦截器：在请求发出去之前，请求拦截器可以检测到，可以再请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段：需和后台商量
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    // 进度条开始
    nprogress.start()
    // config是一个配置对象，对象里有一个很重要的属性，headers请求头
    return config
})

// 响应拦截器：
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done()
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(error)
})

// 对外暴露
export default requests
