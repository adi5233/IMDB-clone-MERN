import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { clearErrors, getMovies } from "../../actions/movieAction";
import { addMoviesToWatchlist } from "../../actions/watchlistAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    background: "#rgb(30, 28, 28)",
  },
  movieList: {
    padding: theme.spacing(1),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    color: "#FFFFFF",
    background: "#5a595645",
    width: 145,
    height: 330,
    position: "relative",
    "&:hover": {
      transform: `translate(${2}px, ${-2}px)`,
    },
  },
  image: {
    width: 140,
    height: 190,
    marginTop: -2,
  },
  title: {
    marginTop: 15,
    fontSize: "0.8rem",
    fontFamily: "sans-serif",
    color: "yellow",
  },
  button: {
    margin: theme.spacing(1),
    marginBottom: "4px",
    position: "absolute",
    bottom: "5px",
    background: "#393737",
    textTransform: "none",
    fontFamily: "sans-serif",
    "&:hover": {
      backgroundColor: "#2d2c2c",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
}));

const MovieList = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { movies, error, loading } = useSelector((state) => state.movies);

  const addToWatchlistHandler = (id) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addMoviesToWatchlist(id));
      alert.success("Movie sucessfully added to watchlist");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMovies());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Container className={classes.root}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {movies &&
                movies.map((movie) => (
                  <Grid item key={movie._id}>
                    <Link className="movieContainer" to={`/movie/${movie._id}`}>
                      <Container className={classes.movieList}>
                        <img
                          src={movie.img_url}
                          alt={movie.name}
                          className={classes.image}
                        />
                        <div className="rating">
                          <StarIcon
                            style={{ fontSize: "20px", color: "yellow" }}
                          />
                          <h1>{movie.users_rating}</h1>
                        </div>
                        <h1 className={classes.title}>{movie.title}</h1>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<AddIcon />}
                          className={classes.button}
                          onClick={(e) => {
                            e.preventDefault();
                            addToWatchlistHandler(movie._id);
                            console.log("button clicked");
                          }}
                        >
                          Watchlist
                        </Button>
                      </Container>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MovieList;
