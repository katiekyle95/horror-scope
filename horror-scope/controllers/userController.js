const db = require("../models");

// Defining methods for the userController
module.exports = {
    // validate user and password
    auth: async function (req, res) {
        try {
            // find user
            var name = req.body,userName;
            if (name === undefined) {
                throw new Error("invalid userName");
            }
            const dbModel = await db.User.find().byName(name);
            if (dbModel.length != 1) {
                throw new Error("user not found");
            } else {
                var user = dbModel[0];
                if (user.password != req.body,password) {
                    throw new Error("invalid password");
                } else {
                    res.json(user);
                }
            }
        } catch (err) {
            res.status(422).json(err.message)
        }
    },
    // sign up a new user
    signUp: async function (req, res) {
        try {
            var name = req.body,userName;
            if (name === undefined) {
                throw new Error("invalid userName");
            }
            if (name.toString().trim().length == 0) {
                throw new Error("invalid userName");
            }
            const dbModel = await db.User.find().byName(name);
            if (dbModel.length > 0) {
                throw new Error("user already exists");
            } else {
                db.User
                    .create(req.body)
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
            }
        } catch (err) {
            res.status(422).json(err.message)
        }
    },
    // get profile 
    profile: async function (req, res) {
        try {
            var name = req.params.name;
            if (name === undefined) {
                throw new Error("invalid userName");
            }
            if (name.toString().trim().length == 0) {
                throw new Error("invalid userName");
            }
            const dbModel = await db.User.find().byName(name);
            if (dbModel.length > 0) {
                var user = {
                    userName: dbModel[0].userName,
                    watched: dbModel[0].watched,
                    wanted: dbModel[0].wanted,
                };
                res.json(user)
            } else {
                throw new Error("invalid userName");
            }
        } catch (err) {
            res.status(422).json(err.message)
        }
    },
    // add movie to a users watched list
    watched: async function (req, res) {
        try {
            var name = req.params.name;
            if (name === undefined) {
                throw new Error("invalid userName");
            }
            if (name.toString().trim().length == 0) {
                throw new Error ("invalid userName");
            }

            var movieId = req.params.movieId;

            console.log( "Watched: " + name + " " + movieId );

            const dbModel = await db.User.find().byName(name);
            if (dbModel.length > 0) {
                var user = dbModel[0];
                await user.watched.addToSet(movieId);
                await user.wanted.pull(movieId);
                await user.save();
                res.json('ok')
            } else {
                throw new Error("invalid userName");
            }
        } catch (err) {
            res.status(422).json(err.message)
        }
    },
    // add movie to a users wanted list
    wanted: async function (req, res) {
        try {
            var name = req.params.name;
            if (name === undefined) {
                throw new Error("invalid userName");
            }
            if (name.toString().trim().length == 0) {
                throw new Error("invalid userName");
            }

            var movieId = req.params.movieId;

            console.log( "Wanted: " + name + " " + movieId );

            const dbModel = await db.User.find().byName(name);
            if (dbModel.length > 0) {
                var user = dbModel[0];
                await user.wanted.addToSet(movieId);
                await user.watched.pull(movieId);
                await user.save();
                res.json('ok')
            } else {
                throw new Error("invalid userName");
            }
        } catch (err) {
            res.status(422).json(err.message)
        }
    },
    // clear movie from a users watched/wanted list
    clear: async function (req, res) {
        try {
            var name = req.params.name;
            if (name === undefined) {
                throw new Error("invalid userName");
            }
            if (name.toString().trim().length == 0) {
                throw new Error("invalid userName");
            }

            var movieId = req.params.movieId;

            const dbModel = await db.User.find().byName(name);
            if (dbModel.length > 0) {
                var user = dbModel[0];
                await user.wanted.pull(movieId);
                await user.watched.pull(movieId);
                await user.save();
                res.json('ok')
            } else {
                throw new Error("invalid userName");
            }
        } catch (err) {
            res.status(422).json(err.message)
        }
    },

};