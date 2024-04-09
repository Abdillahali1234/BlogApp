import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import profileSlice from "./slices/profileSlice";
import PostSlice from "./slices/PostSlice";
import CategorySlice from "./slices/CategorySlice";
import commentSlice from "./slices/commentSlice";
import PasswordSlice from "./slices/PasswordSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    post: PostSlice,
    category: CategorySlice,
    comment: commentSlice,
    password: PasswordSlice,
  },
});

export default store;
