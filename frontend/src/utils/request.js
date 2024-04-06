import axios from "axios";
import { getToken } from "@/utils/token.js";
import router from "@/router/index.jsx";
import { message } from "antd";

const request = axios.create({
  baseURL: "http://127.0.0.1:8080",
  timeout: 60000,
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      setTimeout(() => {
        message.error("登录状态过期");
        router.navigate("/login");
      });
    }
    return Promise.reject(error);
  },
);

export { request };
