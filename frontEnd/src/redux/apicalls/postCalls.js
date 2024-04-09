import request from "../../utilities/request";
import { toast } from "react-toastify";
import { PostActions } from "./../slices/PostSlice";

export function fetchPosts(numOfPage) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${numOfPage}`);
      dispatch(PostActions.setPosts(data?.posts));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function fetchPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(PostActions.setPostsCount(data?.count));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function fetchPostsCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      dispatch(PostActions.setPostsCat(data?.posts));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function createNewPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(PostActions.setLoading());
      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(PostActions.setCreatePost());
      setTimeout(() => dispatch(PostActions.clearIsPostCreate()), 2000);
    } catch (error) {
      console.log(error);
      dispatch(PostActions.clearLoading());
      toast.error(error.response.data.message);
    }
  };
}

export function fetchPost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(PostActions.setPost(data?.post));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function toggleLike(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.patch(
        `/api/posts/likes/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(PostActions.setLikes(data?.post));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

export function updatePostImage(postId, newImage) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.patch(
        `/api/posts/post-image/${postId}`,
        newImage,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

export function updatePost(postId, newPost) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.patch(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(PostActions.setPost(data?.post));
      toast.success("post updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(PostActions.deletePost(data));
      toast.success("post deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}


export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(PostActions.setPosts(data?.posts));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}