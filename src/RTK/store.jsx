import { configureStore } from "@reduxjs/toolkit";
import { movieMainSlice } from "./movieSlice";
import modalReducer from "./modalSlice";
import { globalLoadingSlice } from "./globalLoadingSlice";

export const store = configureStore({
  reducer: {
    movieMain: movieMainSlice.reducer,
    modal: modalReducer,
    globalLoading: globalLoadingSlice.reducer,
  },
});
