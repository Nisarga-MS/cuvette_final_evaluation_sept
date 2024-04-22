import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  username: null,
  token: null,
  userId: null,
};

const userauthSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    findUserRequest: (state) => {
      state.loading = true;
    },
    findUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.userId = action.payload.user._id;
      state.user = action.payload.user;
    },
    findUserFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
    },
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.userId = action.payload.user._id;
      state.user = action.payload.user;
    },
    registerFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.userId = null;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.userId = action.payload.user._id;
      state.user = action.payload.user;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.userId = null;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.userId = null;
    },
    logoutFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  findUserRequest,
  findUserSuccess,
  findUserFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = userauthSlice.actions;

export default userauthSlice.reducer;
