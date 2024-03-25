import Cookies from "js-cookie";
export const getToken = () => {
  return Cookies.get("idToken") || "";
};

export const setToken = (token) => {
  Cookies.set("idToken", token);
};
