// 登录与注册的模块

import { reqGetCode, reqUserInfo, reqUserLogin, reqUserRegister, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: "",
    token: getToken(),
    userInfo: {}
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },

    USERLOGIN(state, token) {
        state.token = token
    },

    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },

    // 清除本地数据
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}

const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发token，用户唯一的标识
        // 将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            // 用户已经登录成功且获取到token
            commit('USERLOGIN', result.data.token)
            // 持久化存储token
            setToken(result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },

    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.data == 200) {
            // 请求成功清除token，action内不能操作state，需提交mutation
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}