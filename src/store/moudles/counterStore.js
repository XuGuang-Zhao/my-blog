import {createSlice} from "@reduxjs/toolkit";

const CountStore = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    add(state) {
      state.count++;
    },
    minus(state) {
      state.count--;
    },
    addToNum(state, action) {
      console.log('action', action)
      state.count = state.count + action.payload
    }
  },
});

const {add, minus, addToNum} = CountStore.actions

const reducer = CountStore.reducer

export {add ,minus, addToNum}

export default reducer
