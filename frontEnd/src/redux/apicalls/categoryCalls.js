import { toast } from "react-toastify";
import request from "../../utilities/request";
import { categoryAction } from "../slices/CategorySlice";

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");

      dispatch(categoryAction.setCategories(data?.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const addCategory = (category) => {
  return async (dispatch, getState) => {
    try {
     await request.post(`/api/categories`, category, {
        headers: {
          Authorization: "Bearer" + " " + getState().auth.user.token,
        },
      });
      toast.success("category added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
export const deleteCategory = (categoryId) => {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(
        `/api/categories/${categoryId}`,
        {
          headers: {
            Authorization: "Bearer" + " " + getState().auth.user.token,
          },
        }
      );

      dispatch(categoryAction.deleteCategory(data?.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
