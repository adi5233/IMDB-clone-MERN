import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import MovieList from "./MovieList.js";
import "./Movies.css";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, Select } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import { clearErrors, getMovies } from "../../actions/movieAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

const genres = [
  "Action",
  "Comedy",
  "Horror",
  "Romance",
  "Drama",
  "Animation",
  "Fantasy",
  "Sci-Fi",
  "Thriller",
  "Family",
  "Adventure",
  "Crime",
  "Mystery",
  "War",
  "Music",
  "Musical",
  "Western",
  "History",
  "Biography",
  "Sport",
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    background: "white",
    borderRadius: 3,
    width: "20vw",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Movies = () => {
  const { keyword } = useParams();
  const classes = useStyles();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, moviesCount, resultPerPage } = useSelector(
    (state) => state.movies
  );

  const [genre, setGenre] = useState("");
  const [sortProperty, setSortProperty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSortProperty = (event) => {
    setSortProperty(event.target.value);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getMovies(keyword, currentPage, genre, sortProperty));
  }, [dispatch, error, alert, currentPage, genre, sortProperty, keyword]);

  return (
    <Fragment>
      <MetaData title="Movies- IMDb" />
      <div className="filter-box">
        <div className="filter-genre">
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple">Genre</InputLabel>
            <Select
              native
              value={genre}
              onChange={handleGenreChange}
              inputProps={{
                name: "age",
                id: "filled-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              {genres.map((genre) => {
                return (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="filter-g">
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple">Sort by</InputLabel>
            <Select
              native
              value={sortProperty}
              onChange={handleSortProperty}
              inputProps={{
                name: "age",
                id: "filled-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value="users_rating">IMDb Rating</option>
              <option value="year">Relese Date</option>
              <option value="metascore">Metascore </option>
              <option value="votes">Vote</option>
            </Select>
          </FormControl>
        </div>
      </div>
      <MovieList />
      <div className="paginationBox">
        <Pagination
          activePage={currentPage}
          totalItemsCount={moviesCount}
          itemsCountPerPage={resultPerPage}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="First"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </Fragment>
  );
};

export default Movies;
