const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userName: { type: String, required: true },
    movieId: { type: Number, required: true },
    quality: {type: Number, require: true},
    entertainment: { type: Number, required: true },
    scariness: { type: Number, required: true },
});

reviewSchema.query.byMovieId = function(id) {
    return this.where('movieId').eq(id);
}

reviewSchema.query.byUserName = function(name) {
    return this.where( {userName: new RegExp( name, 'i')});
}

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;