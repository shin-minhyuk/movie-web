import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_IMG_URL } = import.meta.env;
console.log(VITE_IMG_URL);

export const fetchMovieDataById = createAsyncThunk(
  "movie/fetchMovieDataById",
  async (maxMovieIdx) => {
    const arr = new Array(maxMovieIdx).fill(0).map((v, index) => index);

    const fetchMovieData = async (index) => {
      const res = await axios.get("/movieListData.json");

      const movieData = {
        id: res.data.results[index].id,
        front: VITE_IMG_URL + res.data.results[index].poster_path,
        back: VITE_IMG_URL + res.data.results[index].backdrop_path,
        title: res.data.results[index].title,
        description: res.data.results[index].overview,
        release_data: res.data.results[index].release_data,
      };
      return movieData;
    };
    const moviesData = await Promise.all(arr.map((el) => fetchMovieData(el)));
    console.log(moviesData);
    return moviesData;
  }
);
