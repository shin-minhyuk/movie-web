import { createSelector } from "@reduxjs/toolkit";

export const selectMovieById = (movieId) =>
  createSelector(
    (state) => state.movieMain,
    (movieMain) => {
      const movieMainAll = [
        ...movieMain.now_playing,
        ...movieMain.popular,
        ...movieMain.top_rated,
        ...movieMain.upcoming,
      ];

      return movieMainAll.find((el) => el.id === Number(movieId));
    }
  );
