import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./movieSlice";
import modalReducer from "./modalSlice";
import { globalLoadingSlice } from "./globalLoadingSlice";

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    modal: modalReducer,
    globalLoading: globalLoadingSlice.reducer,
  },
});



