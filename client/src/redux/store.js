import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./layout/layoutSlice.js";
import modalSlice from "./modal/modalSlice.js";
import userauthSlice from "./userauth/userauthSlice.js";
import storyReducer from "./story/storySlice.js";

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    modal: modalSlice,
    userauth: userauthSlice,
    story: storyReducer,
  },
});

export default store;
