import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModal: false,
  },
  reducers: {
    isModal(state, action) {
      return { ...state, isModal: action.payload };
    },
  },
});

export const { actions, reducer } = modalSlice;
export const { isModal } = actions;
export default reducer;
