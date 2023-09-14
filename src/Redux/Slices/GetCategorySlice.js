import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  isLoading: false,
  mainData: [],
  subData: [],
  error: null,
};

const GetCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    userGetMainCategoryRequest(state, action) {
      return { ...state, isLoading: true };
    },
    userGetMainCategorySuccess(state, action) {
      return { ...state, mainData: action.payload, isLoading: false };
    },
    userGetMainCategoryFailure(state, action) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: action?.payload?.message,
      });
      return { ...state, isLoading: false };
    },
    userGetSubCategoryRequest(state, action) {
      return { ...state, isLoading: true };
    },
    userGetSubCategorySuccess(state, action) {
      return { ...state, subData: action.payload, isLoading: false };
    },
    userGetSubCategoryFailure(state, action) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: action?.payload?.message,
      });
      return { ...state, isLoading: false };
    },
  },
});

export const {
  userGetMainCategoryFailure,
  userGetMainCategoryRequest,
  userGetMainCategorySuccess,
  userGetSubCategoryFailure,
  userGetSubCategoryRequest,
  userGetSubCategorySuccess,
} = GetCategorySlice.actions;
export default GetCategorySlice.reducer;
