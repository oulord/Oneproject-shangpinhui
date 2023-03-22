// 对所有的 API 接口进行管理
import requests from './request'

//三级联动的接口
// /api/product/getBaseCategoryList  是一个get请求，无参数
export const reqCategoryList = () => {
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get',
        
    })
}