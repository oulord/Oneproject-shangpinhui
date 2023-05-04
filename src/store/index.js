// 引入vue
import Vue from "vue";
// 引入vuex
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex)

// #region
//state：仓库存储数据的地方
// const state = {

// };

//mutations：修改 state 的唯一手段
// const mutations = {

// };

// actions：处理 action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {
// 这里可以书写业务逻辑，但是不能修改 state
// };

// getters：理解为计算属性，用于简化数据，让组件获取仓库的数据更方便
// const getters = {

// }
//#endregion

// 引入不同页面的仓库
import home from './Home'
import search from './Search'
import login from './Login'
import register from './Register'
import detail from "./detail";

// 对外暴露Store类的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        login,
        register,
        detail
    }
})