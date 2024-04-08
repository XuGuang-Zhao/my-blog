import {request} from "@/utils/request.js";

// 获取频道列表
export function getChannelAPI(formData) {
    return request({
        url: "http://geek.itheima.net/v1_0/channels",
        method: "get",
        data: formData,
    });
}

// 获取文章列表
export function getArticleListAPI(params) {
    return request({
        url: "http://geek.itheima.net/v1_0/mp/articles",
        method: 'GET',
        params
    })
}

// 创建文章
export function createArticleApi(data) {
    return request({
        url: "http://geek.itheima.net/v1_0/mp/articles?draft=false",
        method: "post",
        data,
    });
}

// 删除文章
export function delArticleAPI(id) {
    return request({
        url: `http://geek.itheima.net/v1_0/mp/articles/${id}`,
        method: 'DELETE'
    })
}

