import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
  name: "globalLoading",
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload;
    },
  },
});
