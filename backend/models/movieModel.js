const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: String,
  rating: String,
  year: String,
  users_rating: String,
  votes: String,
  metascore: String,
  img_url: String,
  countries: Array,
  languages: Array,
  actors: String,
  genre: Array,
  tagline: String,
  description: String,
  directors: Array,
  runtime: String,
  imdb_url: String,
});

module.exports = mongoose.model("Movie", movieSchema);
