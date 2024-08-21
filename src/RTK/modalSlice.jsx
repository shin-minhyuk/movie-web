import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    isModal(state, action) {
      return action.payload;
    },
  },
});
