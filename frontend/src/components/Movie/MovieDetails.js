import React, { Fragment, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getMovieDetails,
  addVotes,
} from "../../actions/movieAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { useAlert } from "react-alert";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const MovieDetails = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { movie, loading, error } = useSelector((state) => state.movieDetails);
  const { isUpdated } = useSelector((state) => state.movie);
  const { isAuthenticated } = useSelector((state) => state.user);

  // const [genreType, setGenreType] = useState("");

  // const handleGenreChange = (genre) => {
  //   setGenreType(genre);
  // };

  const increaseVotes = (id, votes) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (!isUpdated) {
        let Votes = parseInt(votes.replace(/,/g, ""));
        const newVotes = Votes + 1;
        dispatch(addVotes(id, newVotes));
        alert.success("Up Vote Sucessfully");
      } else alert.success("You Have Already Voted");
    }
  };

  const decreaseVotes = (id, votes) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (!isUpdated) {
        let Votes = parseInt(votes.replace(/,/g, ""));
        const newVotes = Votes - 1;
        dispatch(addVotes(id, newVotes));
        alert.success("Down Vote Sucessfully");
      }
      alert.success("YOU Have Already Voted");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMovieDetails(id));
  }, [dispatch, id, error, alert, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${movie.title} - IMDB`} />
          <Container>
            <div className="MovieDetails">
              <div className="MovieDetails-Header">
                <div className="MovieDetails-Header-1">
                  <h1>{movie.title}</h1>
                </div>
                <div className="MovieDetails-Header-2">
                  <div className="MovieDetails-Header-2-Left">
                    {movie.genre &&
                      movie.genre.map((gType) => (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          className={classes.button}
                          // onClick={() => handleGenreChange(gType)}
                          key={gType}
                        >
                          {gType}
                        </Button>
                      ))}
                    <h1>{movie.year}</h1>
                    <h1>{movie.runtime}</h1>
                  </div>

                  <div className="MovieDetails-Header-2-Right">
                    <div className="MovieDetails-Header-2-Right-IMDB-Ratting">
                      <h1>IMDB RATING</h1>
                      <p>{movie.users_rating}/10</p>
                    </div>
                    <div className="MovieDetails-Header-2-Right-User-Rating">
                      <h1> VOTES</h1>
                      <p>{movie.votes}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="detailsBlock">
                <div className="detailsBlock-Left">
                  <img
                    className="detailsBlock-Left-Image"
                    src={movie.img_url}
                    alt={movie.name}
                  />
                </div>
                <div className="detailsBlock-Right">
                  <h1>Tagline: </h1>
                  <p>{movie.tagline}</p>
                  <h1>Description: </h1>
                  <p>{movie.description}</p>
                  <h1>Directors:</h1>
                  <p> {movie.directors} </p>
                  <div className="detailsBlock-Right-Buttons">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<ThumbUpAltIcon />}
                      className={classes.button}
                      onClick={() => increaseVotes(id, movie.votes)}
                    >
                      Up Vote
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<ThumbDownAltIcon />}
                      className={classes.button}
                      onClick={() => decreaseVotes(id, movie.votes)}
                    >
                      Down Vote
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MovieDetails;
