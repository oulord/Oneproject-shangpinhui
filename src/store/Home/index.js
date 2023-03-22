import { reqCategoryList } from "@/api"

// Home 页面的仓库
const state = {
    // state 中的数据默认初识值不能乱写，服务器返回的是对象起始值就是对象，服务器返回的是数组起始值就是数组。【根据接口的返回值进行初始化】
    categoryList:[]
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}

const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}) {
        let result = await reqCategoryList()
        // console.log(result);
        if(result.code){
            commit('CATEGORYLIST',result.data)
        }
    }
}

const getters = {}

export default {
    // namespaced:true,  添加命名空间
    state,
    mutations,
    actions,
    getters
}