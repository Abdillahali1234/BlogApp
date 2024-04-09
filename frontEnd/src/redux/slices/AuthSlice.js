import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  messageRegister: null,
  isEmailVerified: false,
  
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.messageRegister = null;
    },
    logout: (state) => {
      state.user = null;
    },
    register: (state, action) => {
      state.messageRegister = action.payload;
    },
    setPhoto: (state, action) => {
      state.user.profilePhoto = action.payload;
    },
    setEmailVerified: (state, ) => {
      state.isEmailVerified = true;
      state.messageRegister=null;
    }
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
