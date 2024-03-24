import counterStore from "@/store/moudles/counterStore.js";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore ({
    reducer: {
        counter: counterStore
    }
})

export default store