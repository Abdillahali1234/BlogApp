import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postsCount: 0,
  postsCat: [],
  isPostCreated: false,
  isLoading: false,
  post: null,
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostsCount: (state, action) => {
      state.postsCount = action.payload;
    },
    setPostsCat: (state, action) => {
      state.postsCat = action.payload;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
    setCreatePost: (state) => {
      state.isPostCreated = true;
      state.isLoading = false;
    },
    clearIsPostCreate: (state) => {
      state.isPostCreated = false;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setLikes: (state, action) => {
      state.post.likes = action.payload.likes;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id != action.payload);
    },
    addComment: (state, action) => {
      state.post.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      state.post.comments = state.post.comments.map((comment) => {
        if (comment._id === action.payload._id) {
          return action.payload;
        }
        return comment;
      });
    },
    deleteComment: (state, action) => {
         state.post.comments = state.post.comments.filter(
           (comment) => comment._id !== action.payload._id
         );
       
    },
  },
});

export const PostActions = PostSlice.actions;
export default PostSlice.reducer;
