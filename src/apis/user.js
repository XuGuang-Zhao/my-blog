// 用户登录
import {request} from "@/utils/request.js";

export function userLogin(userInfo) {
    return request({
        url: '/api/login',
        method: 'post',
        data: userInfo
    })
}