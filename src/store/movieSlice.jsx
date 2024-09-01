import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieMain } from "./thunk";

export const movieMainSlice = createSlice({
  name: "movie",
  initialState: {
    loading: false,
    now_playing: [],
    popular: [],
    top_rated: [],
    upcoming: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieMain.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieMain.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchMovieMain.fulfilled, (state, action) => {
      state.loading = false;
      state.now_playing = action.payload.now_playing;
      state.popular = action.payload.popular;
      state.top_rated = action.payload.top_rated;
      state.upcoming = action.payload.upcoming;
    });
  },
});
