import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isError: false,
  },
  reducers: {
    setError(state) {
      state.isError = true;
    },
  },
});

export const passwordActions = passwordSlice.actions;

export default passwordSlice.reducer;
