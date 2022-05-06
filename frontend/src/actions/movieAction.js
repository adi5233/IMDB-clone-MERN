import axios from "axios";

import {
  ALL_MOVIE_FAIL,
  ALL_MOVIE_REQUEST,
  ALL_MOVIE_SUCCESS,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_SUCCESS,
  UPDATE_MOVIE_REQUEST,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_MOVIE_FAIL,
  CLEAR_ERRORS,
} from "../constants/movieConstants";

export const getMovies =
  (keyword = "", currentPage = 1, genre, sortProperty) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_MOVIE_REQUEST });
      let link = `/api/v1/movies?keyword=${keyword}&page=${currentPage}`;

      if (genre || sortProperty) {
        link = `/api/v1/movies?keyword=${keyword}&genre=${genre}&sortProperty=${sortProperty}&page=${currentPage}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_MOVIE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_MOVIE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/movie/${id}`);

    dispatch({
      type: MOVIE_DETAILS_SUCCESS,
      payload: data.movie,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addVotes = (id, votes) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MOVIE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/movie/${id}`, { votes }, config);

    dispatch({
      type: UPDATE_MOVIE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MOVIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
