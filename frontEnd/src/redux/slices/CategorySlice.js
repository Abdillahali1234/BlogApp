import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    
    deleteCategory:(state,action)=>{
      state.categories=state.categories.filter(c => c._id === action.payload._id)
    }
  },
});

export const categoryAction = categorySlice.actions;

export default categorySlice.reducer;
