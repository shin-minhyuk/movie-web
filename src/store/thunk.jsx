import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientMovie } from "../client/clientMovie";

// 메인페이지 전용 섹션별 데이터 한번에 로드
export const fetchMovieMain = createAsyncThunk(
  "movie/fetchMovieMain",
  async () => {
    // movie data fetch func
    const fetch_now_playing = clientMovie.get("/movie/now_playing");
    const fetch_popular = clientMovie.get("/movie/popular");
    const fetch_top_rated = clientMovie.get("/movie/top_rated");
    const fetch_upcoming = clientMovie.get("/movie/upcoming");

    // allmovies data fetch func
    const [now_playing, popular, top_rated, upcoming] = await Promise.all([
      fetch_now_playing,
      fetch_popular,
      fetch_top_rated,
      fetch_upcoming,
    ]);

    return {
      now_playing: now_playing.data.results,
      popular: popular.data.results,
      top_rated: top_rated.data.results,
      upcoming: upcoming.data.results,
    };
  }
);
