import request from "../../utilities/request";
import { authActions } from "../slices/AuthSlice";
import { toast } from "react-toastify";

export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch(authActions.logout());
  };
}

export function registerUser(userDate) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", userDate);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setEmailVerified());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}
