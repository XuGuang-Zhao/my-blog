import {createSlice} from "@reduxjs/toolkit";
import {request} from "@/utils/request.js";
import {
    setToken as setCookieToken,
    getToken,
    removeToken,
} from "@/utils/token.js";
import {userLogin, userRegister} from "@/apis/user.js";

const userStore = createSlice({
    name: "user",
    initialState: {
        token: getToken(),
        userInfo: {},
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            setCookieToken(action.payload);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.token = "";
            state.userInfo = {};
            removeToken();
        },
    },
});

const {setToken, setUserInfo, clearUserInfo} = userStore.actions;
const reducer = userStore.reducer;

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await userLogin(loginForm);
        await dispatch(setToken(res.data.token));
    };
};

const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get("/my/userInfo");
        await dispatch(setUserInfo(res.data));
    };
};

export {fetchLogin, fetchUserInfo, setToken, setUserInfo, clearUserInfo};

export default reducer;
