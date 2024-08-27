import { configureStore } from "@reduxjs/toolkit";
import { movieMainSlice } from "./movieSlice";
import modalReducer from "./modalSlice";
import { globalLoadingSlice } from "./globalLoadingSlice";
import { favoritesSlice, userSlice } from "./uesrSlice";

export const store = configureStore({
  reducer: {
    movieMain: movieMainSlice.reducer,
    modal: modalReducer,
    globalLoading: globalLoadingSlice.reducer,
    user: userSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});
