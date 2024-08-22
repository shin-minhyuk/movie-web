import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./movieSlice";
import { modalSlice } from "./modalSlice";
import { globalLoadingSlice } from "./globalLoadingSlice";

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    modal: modalSlice.reducer,
    globalLoading: globalLoadingSlice.reducer,
  },
});
