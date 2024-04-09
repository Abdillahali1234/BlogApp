import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileInfo: null,
  isLoading: false,
  profileDeleted: false,
  userCount: null,
  profiles: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profileInfo = action.payload;
    },
    setProfilePhoto: (state, action) => {
      state.profileInfo.imagePortfolio = action.payload;
    },
    updateProfile: (state, action) => {
      state.profileInfo = action.payload;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
    setDeleted: (state) => {
      state.profileDeleted = true;
      state.isLoading = false;
    },
    clearDeleted: (state) => {
      state.profileDeleted = false;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    setProfilesCount: (state, action) => {
      state.userCount = action.payload;
    },
  },
});

export const ProfileActions = profileSlice.actions;
export default profileSlice.reducer;
