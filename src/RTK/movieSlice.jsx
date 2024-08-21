import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDataById } from "./thunk";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieDataById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieDataById.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchMovieDataById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});
