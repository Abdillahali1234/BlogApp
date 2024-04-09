import { toast } from "react-toastify";
import request from "../../utilities/request";
import { ProfileActions } from "../slices/profileSlice";
import { authActions } from "../slices/AuthSlice";

export function getProfileUser(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(ProfileActions.setProfile(data?.user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function uploadProfilePhoto(photo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-upload-photo`,
        photo,
        {
          headers: {
            Authorization: "Bearer" + " " + getState().auth.user.token,
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      dispatch(ProfileActions.setProfilePhoto(data.data.url));
      dispatch(authActions.setPhoto(data.data));
      toast.success(data.message);
      const user = JSON.parse(localStorage.getItem("user"));
      user.profilePhoto = data.data;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function UpdateUser(userId, profileData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.patch(
        `/api/users/profile/${userId}`,
        profileData,
        {
          headers: {
            Authorization: "Bearer" + " " + getState().auth.user.token,
          },
        }
      );
      dispatch(ProfileActions.updateProfile(data.data));
      toast.success(data.message);
      const user = JSON.parse(localStorage.getItem("user"));
      user.fullName = data.data.fName + " " + data.data.lName;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
}

export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(ProfileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer" + " " + getState().auth.user.token,
        },
      });
      dispatch(ProfileActions.setDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(ProfileActions.clearDeleted()), 1000);
    } catch (error) {
      toast.error(error.response?.data.message);
      dispatch(ProfileActions.clearLoading());
    }
  };
}

export function getProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer" + " " + getState().auth.user.token,
        },
      });
      dispatch(ProfileActions.setProfiles(data?.users));
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
}

export function getProfilesCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer" + " " + getState().auth.user.token,
        },
      });
      dispatch(ProfileActions.setProfilesCount(data?.count));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };
}
