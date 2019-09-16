const db = require("../models");

// Defining methods for the reviewController
module.exports = {

    // add a review
    create: async function (req, res) {
        try {
            // check first to see if this user has already reviewed this movie
            const movieId = req.body.movieId;
            const userName = req.body.userName;
            const query = {
                userName: userName,
                movieId: movieId
            };

            const dbmodel = await db.Review.find(query);
            if (dbmodel.length > 0) {
                // found one, so update it
                const updatedModel = await dbmodel[0].update(req.body);
                res.json(updatedModel);
            } else {
                const createdModel = await db.Review.create(req.body);
                res.json(createdModel);
            }
        } catch (err) {
            res.status(422).json(err);
        }
    },
};