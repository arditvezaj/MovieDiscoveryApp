import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMoviesStart: (state) => {
      state.loading = true;
    },
    fetchMoviesSuccess: (state, action) => {
      state.loading = false;
      state.movies = action.payload;
    },
    fetchMoviesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } =
  movieSlice.actions;
export default movieSlice.reducer;
export const selectMovies = (state: RootState) => state.movies;
