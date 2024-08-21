import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./movieSlice";
import { modalSlice } from "./modalSlice";

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    modal: modalSlice.reducer,
  },
});
