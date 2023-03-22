import { reqCategoryList } from "@/api";

// Home 页面的仓库
const state = {}

const mutations = {}

const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    categoryList(){
        let result = reqCategoryList()
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}