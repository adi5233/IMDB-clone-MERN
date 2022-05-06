import {
  ADD_TO_WATCHLIST,
  REMOVE_WATCHLIST_MOVIE,
} from "../constants/watchlistConstants";

export const watchlistReducer = (state = { watchlistMovies: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      const movie = action.payload;

      const isMovieExist = state.watchlistMovies.find(
        (i) => i.movie === movie.movie
      );

      if (isMovieExist) {
        return {
          ...state,
          watchlistMovies: state.watchlistMovies.map((i) =>
            i.movie === isMovieExist.movie ? movie : i
          ),
        };
      } else {
        return {
          ...state,
          watchlistMovies: [...state.watchlistMovies, movie],
        };
      }

    case REMOVE_WATCHLIST_MOVIE:
      return {
        ...state,
        watchlistMovies: state.watchlistMovies.filter(
          (i) => i.movie !== action.payload
        ),
      };

    default:
      return state;
  }
};
