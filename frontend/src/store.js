import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  moviesReducer,
  movieReducer,
  movieDetailsReducer,
} from "./reducers/movieReducer";

import { watchlistReducer } from "./reducers/watchlistReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  movieDetails: movieDetailsReducer,
  user: userReducer,
  watchlist: watchlistReducer,
});

let initialState = {
  watchlist: {
    watchlistMovies: localStorage.getItem("watchlistMovies")
      ? JSON.parse(localStorage.getItem("watchlistMovies"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
