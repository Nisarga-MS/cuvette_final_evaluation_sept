import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./layout/layoutSlice.js";
import modalSlice from "./modal/modalSlice.js";
export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    modal: modalSlice,
  },
});

export default store;
