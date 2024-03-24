import { configureStore } from "@reduxjs/toolkit";
import userStore from "@/store/moudles/user.js";

const store = configureStore({
  reducer: {
    user: userStore,
  },
});

export default store;
