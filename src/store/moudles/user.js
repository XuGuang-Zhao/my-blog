import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils/request.js";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
});

const { setToken } = userStore.actions;
const reducer = userStore.reducer;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm);
    console.log("res", res);
    dispatch(setToken(res.data.token));
  };
};
export { fetchLogin, setToken };

export default reducer;
