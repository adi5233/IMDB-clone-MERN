import {
  ADD_TO_WATCHLIST,
  REMOVE_WATCHLIST_MOVIE,
} from "../constants/watchlistConstants";
import axios from "axios";

export const addMoviesToWatchlist = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/movie/${id}`);

  dispatch({
    type: ADD_TO_WATCHLIST,
    payload: {
      movie: data.movie._id,
      title: data.movie.title,
      img_url: data.movie.img_url,
    },
  });

  localStorage.setItem(
    "watchlistMovies",
    JSON.stringify(getState().watchlist.watchlistMovies)
  );
};

export const removeMoviesFromWatchlist = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_WATCHLIST_MOVIE,
    payload: id,
  });

  localStorage.setItem(
    "watchlistMovies",
    JSON.stringify(getState().watchlist.watchlistMovies)
  );
};
