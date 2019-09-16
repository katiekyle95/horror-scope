const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    movieId: { type: Number, required: true },
    title: { type: String, required: true },
    overview: {type: String },
    director: { type: String },
    releaseDate: { type: String },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;