import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter((c) => c._id !== action.payload);
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;
