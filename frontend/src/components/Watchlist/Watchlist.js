import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import "./Wishlist.css";
import { useSelector, useDispatch } from "react-redux";
import { removeMoviesFromWatchlist } from "../../actions/watchlistAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "90vh",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    width: "86vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "#FFFFFF",
    background: "#5a595645",
  },
  button: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "0.6rem",
    marginLeft: "3vw",
    marginright: "1vw",
    width: "3vw",
    height: "4vh",
  },
}));

const Watchlist = () => {
  const classes = useStyles();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { watchlistMovies } = useSelector((state) => state.watchlist);

  const watchHandler = (id) => {
    if (id) {
      navigate(`/movie/${id}`);
    } else {
      navigate("/movies");
    }
  };

  const removeFromWatchlistHandler = (id) => {
    dispatch(removeMoviesFromWatchlist(id));
    alert("Removed movie sucessfully");
  };

  return (
    <Fragment>
      {watchlistMovies.length === 0 ? (
        <div className="emptyWatchlist">
          <Typography>No Movies in Your Watchlist</Typography>
          <Link to="/movies">View Moviess</Link>
        </div>
      ) : (
        <Fragment>
          <MetaData title={`IMDB`} />
          <Container>
            <div className={classes.root}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                {watchlistMovies &&
                  watchlistMovies.map((movie) => (
                    <Grid
                      item
                      key={movie.title}
                      xs={12}
                      lg={12}
                      sm={12}
                      md={12}
                    >
                      <Paper key={movie.title} className={classes.paper}>
                        <img
                          src={movie.img_url}
                          alt={movie.name}
                          className="image"
                        />

                        <h1 className="title">{movie.title}</h1>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          onClick={() => watchHandler(movie.movie)}
                        >
                          Watch
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          className={classes.button}
                          onClick={() =>
                            removeFromWatchlistHandler(movie.movie)
                          }
                        >
                          Remove
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </div>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Watchlist;
