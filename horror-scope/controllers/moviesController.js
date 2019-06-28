const axios = require("axios");
const db = require("../models");

const HORROR_GENRE = 27;
const THRILLER_GENRE = 53;
const MAX_SEARCH_RESULTS = 40;
const MAX_SEARCH_PAGES = 30;
const MAX_RECOMMENDATIONS = 5;

// Defining methods for the moviesController
module.exports = {

    // discover
    discover: async function (req, res) {
        try {
            var page = req.body.page;
            if (page === undefined) {
                page = 1;
            }
            var url = `https://api.themoviedb.org/3/discover/movie?api_key=a57716cc5f32391a19f6f29ee191775c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=200&with_genres=27`;
            const response = await axios.get(url);
            var movies = response.data.results;
            for ( var i = 0; i < movies.length; i++)
            {
                var movie = movies[i];
                // get any reviews
                const reviews = await db.Review.find().byMovieId(movie.id);
                var avgQ = 0;
                var avgE = 0;
                var avgS = 0;
                if (reviews.length > 0) {
                    for (var reviewIndex = 0; reviewIndex < reviews.length; reviewIndex++) {
                        const review = review[reviewIndex];
                        avgQ += review.quality;
                        avgE += review.entertainment;
                        avgS += review.scariness;
                    }
                    avgQ /= reviews.length;
                    avgE /= reviews.length;
                    avgS /= reviews.length;
                }
                movie.averageQuality = avgQ.toFixed(1);
                movie.averageEntertainment = avgE.toFixed(1);
                movie.averageScariness = avgS.toFixed(1);
            }

            res.json(movies);
        }   catch (err) {
            res.status(422).json(err.message)
        }
    },

    // search by name
    search: async function (req, res) {
        try {
            var searchName = req.params.name;
            if (searchName === undefined) {
                searchName = "jaws"
            }

            var foundMovies = [];
            var page = 1;
            done = false;
            while (!done) {
                var url = `https://api.themoviedb.org/3/search/movie?api_key=a57716cc5f32391a19f6f29ee191775c&language=en-US&query=${searchName}&page=${page}&include_adult=false`;
                var response = await axios.get(url);
                const movieList = response.data.results;
                for (movie of movieList) {
                    if (movie.genre_ids.indexOf(HORROR_GENRE) != -1) {

                        // get any reviews
                        const reviews = await db.Review.find().byMovieId(movie.id);
                        var avgQ = 0;
                        var avgE = 0;
                        var avgS = 0;
                        if (reviews.length > 0) {
                            for (var reviewIndex = 0; reviewIndex < reviews.length; reviewIndex++) {
                                const review = reviews[reviewIndex];
                                avgQ += review.quality; 
                                avgE += review.entertainment;
                                avgS += review.scariness;
                            }
                            avgQ /= reviews.length;
                            avgE /= reviews.length;
                            avgS /= reviews.length;
                        }
                        movie.averageQuality = avgQ.toFixed(1);
                        movie.averageEntertainment = avgE.toFixed(1);
                        movie.averageScariness = avgS.toFixed(1);

                        foundMovies.push(movie);

                    }
                }

                // keep searching until it has either:
                //  found max results
                //  searched max pages
                //  finished all pages
                if (foundMovies.length >= MAX_SEARCH_RESULTS) {
                    done = true;
                } else {
                    var totalPages = response.data.total_pages;
                    if (page == totalPages || page == MAX_SEARCH_PAGES) {
                        DONE = TRUE;
                    } else {
                        page++;
                    }
                }
            }
            res.json(foundMovies);
        } catch (err) {
            res.status(422).json(err.message)
        }
    },

    // get detail
    details: async function (req, res) {
        try {
            var id = req.params.id;
            if (id === undefined) {
                res.json({});
                return;
            }

            // get movie details
            var url = `https://api.themoviedb.org/3/movie/${id}?api_key=a57716cc5f32391a19f6f29ee191775c&language=en-US`;
            const details = await axios.get(url);

            // get recommendations
            url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a57716cc5f32391a19f6f29ee191775c&language=en-US&page=1`;
            const recommendations = await axios.get(url);

            // get any reviews
            const reviews = await db.Review.find().byMovieId(id);
            var avgQ = 0;
            var avgE = 0;
            var avgS = 0;
            if (reviews.length > 0) {
                for (var reviewIndex = 0; reviewIndex < reviews.length; reviewIndex++) {
                    const review = reviews[reviewIndex];
                    avgQ += review.quality;
                    avgE += review.entertainment;
                    avgS += review.scariness;
                }
                avgQ /= reviews.length;
                avgE /= reviews.length;
                avgS /= reviews.length;
            }

            var movie = details.data;
            var horrorRecs = [];
            var recs = recommendations.data.results;

            for ( var recIndex = 0; recIndex < recs.length; recIndex++ )
            {
                const movieRec = recs[recIndex];
                if ( movieRec.genre_ids.indexOf ( HORROR_GENRE ) != -1 )
                {
                    horrorRecs.push( movieRec );
                }
            }


            movie.recommendations = horrorRecs.slice(0, MAX_RECOMMENDATIONS);
            movie.reviews = reviews;
            movie.averageQuality = avgQ.toFixed(1);
            movie.averageEntertainment = avgE.toFixed(1);
            movie.averageScariness = avgS.toFixed(1);

            res.json(movie);
        } catch (err) {
            res.status(422).json(err.message)
        }
    },

    list: async function (req, res) {
        try {
            const movieList = req.body.movieList;

            var listData = [];
            for ( movieId of movieList )
            {
                var url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=a57716cc5f32391a19f6f29ee191775c&language=en-US`;
                const details = await axios.get(url);
                var movie = details.data;

                var movieData = {
                    title: movie.title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                    director: movie.director,
                };
                listData.push( movieData );
            }
            res.json(listData);
        } catch (err) {
            res.status(422).json(err);
        }
    },

};
