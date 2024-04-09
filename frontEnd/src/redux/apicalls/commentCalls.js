import { toast } from "react-toastify";
import request from "../../utilities/request";
import { PostActions } from "../slices/PostSlice";
import { commentActions } from "../slices/commentSlice";

export const AddCommentFn = (newComment) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", newComment, {
        headers: {
          Authorization: "Bearer" + " " + getState().auth.user.token,
        },
      });

      dispatch(PostActions.addComment(data?.comment));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const updateCommentFn = (commentId, newComment) => {
  return async (dispatch, getState) => {
    try {
      console.log(newComment);
      const { data } = await request.patch(
        `/api/comments/${commentId}`,
        { text: newComment },
        {
          headers: {
            Authorization: "Bearer" + " " + getState().auth.user.token,
          },
        }
      );

      dispatch(PostActions.updateComment(data?.comment));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const deleteCommentFn = (commentId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: "Bearer" + " " + getState().auth.user.token,
        },
      });

      dispatch(PostActions.deleteComment(data?.comment));
      dispatch(commentActions.deleteComment(data?.comment?._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const getAllComments = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments`, {
        headers: {
          Authorization: "Bearer" + " " + getState().auth.user.token,
        },
      });
      console.log(data.comments);
      dispatch(commentActions.setComments(data?.comments));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
