const Movie = require("../models/movieModel");
const ErrorHander = require("../utils/errorResponse");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Get All Movie
exports.getAllMovies = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 24;
  const moviesCount = await Movie.countDocuments();
  const apiFeature = new ApiFeatures(Movie.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    .sortByProperty();

  let movies = await apiFeature.query;

  let filteredMoviesCount = movies.length;

  res.status(200).json({
    success: true,
    movies,
    moviesCount,
    resultPerPage,
    filteredMoviesCount,
  });
});

exports.getMovieDetails = catchAsyncErrors(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new ErrorHander("Movie not found", 404));
  }

  res.status(200).json({
    success: true,
    movie,
  });
});

exports.updateMovie = catchAsyncErrors(async (req, res, next) => {
  const { votes } = req.body;

  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return next(new ErrorHander("Movie not found", 404));
  }
  movie.votes = votes;
  await movie.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
