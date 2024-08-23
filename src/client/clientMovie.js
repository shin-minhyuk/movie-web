import axios from "axios";

// TMDB instance
const { VITE_MOVIE_URL, VITE_MOVIE_ACCESS_TOKEN, VITE_MOVIE_APIKEY } =
  import.meta.env;

export const clientMovie = axios.create({
  baseURL: VITE_MOVIE_URL,
  headers: {
    // apikey: VITE_MOVIE_APIKEY,
    Authorization: `Bearer ${VITE_MOVIE_ACCESS_TOKEN}`,
  },
});
