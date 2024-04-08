// 用户登录
import {request} from "@/utils/request.js";

export function userLogin(userInfo) {
    return request({
        url: 'http://geek.itheima.net/v1_0/authorizations',
        method: 'post',
        data: userInfo
    })
}

export function getUserInfo() {
    return request({
        url: 'http://geek.itheima.net/v1_0/user/profile',
        method: 'get',
    })
}

export function userRegister(userInfo) {
    return request({
        url: 'http://127.0.0.1:8080/api/register',
        method: 'post',
        data: userInfo
    })
}