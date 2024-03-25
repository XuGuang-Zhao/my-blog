import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils/request.js";
import { setToken as setCookieToken, getToken } from "@/utils/token.js";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken(),
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      setCookieToken(action.payload);
    },
  },
});

const { setToken } = userStore.actions;
const reducer = userStore.reducer;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm);
    await dispatch(setToken(res.data.token));
  };
};
export { fetchLogin, setToken };

export default reducer;
