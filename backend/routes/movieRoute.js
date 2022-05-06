const express = require("express");
const {
  getAllMovies,
  getMovieDetails,
  updateMovie,
} = require("../controllers/movieController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/movies").get(getAllMovies);
router
  .route("/movie/:id")
  .get(getMovieDetails)
  .put(isAuthenticatedUser, updateMovie);

module.exports = router;
