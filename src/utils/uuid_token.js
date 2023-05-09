import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储（localstorage）
export const getUUID = () => {
    // 先从本地存储获取uuid（看一下本地存储里面是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有
    if (!uuid_token) {
        // 就生成临时游客身份
        uuid_token = uuidv4()
        // 并进行本地存储
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    // 切记有返回值，没有返回值时undefined
    return uuid_token
}