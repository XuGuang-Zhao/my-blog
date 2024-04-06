import Cookies from "js-cookie";
export const getToken = () => {
  return Cookies.get("idToken") || "";
};

export const setToken = (token) => {
  Cookies.set("idToken", `Bearer ${token}`);
};

export const removeToken = () => {
  Cookies.remove("idToken");
};
