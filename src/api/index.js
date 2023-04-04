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
export const reqGetBannerList = ()=>mockRequests.get(`/banner`)

// 获取floor数据
export const reqFloorList = ()=>mockRequests.get(`/floor`)