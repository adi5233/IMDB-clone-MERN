import {
  ALL_MOVIE_REQUEST,
  ALL_MOVIE_FAIL,
  ALL_MOVIE_SUCCESS,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_SUCCESS,
  UPDATE_MOVIE_REQUEST,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_MOVIE_FAIL,
  UPDATE_MOVIE_RESET,
  CLEAR_ERRORS,
} from "../constants/movieConstants";

export const moviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case ALL_MOVIE_REQUEST:
      return {
        loading: true,
        movies: [],
      };
    case ALL_MOVIE_SUCCESS:
      return {
        loading: false,
        movies: action.payload.movies,
        moviesCount: action.payload.moviesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredMoviesCount: action.payload.filteredMoviesCount,
      };
    case ALL_MOVIE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const movieDetailsReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case MOVIE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case MOVIE_DETAILS_SUCCESS:
      return {
        loading: false,
        movie: action.payload,
      };
    case MOVIE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const movieReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_MOVIE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
