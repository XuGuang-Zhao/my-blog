import { request } from "@/utils/request.js";

// 获取频道列表
export function getChannelAPI(formData) {
  return request({
    url: "/channels",
    method: "get",
    data: formData,
  });
}

export function createArticleApi(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "post",
    data,
  });
}
