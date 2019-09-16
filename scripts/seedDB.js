const mongoose = require("mongoose");
const db = require("../models");

// This file empties the user and review collections and 
// inserts the users and reviews

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/horrorscope", {
    useNewUrlParser: true
  }
);

const userList = [
  "receptivesaint",
  "rainycurve",
  "lastwickham",
  "gloriousparcel",
  "divergentmischief",
  "specialscold",
  "lividpantheon",
  "unsungcast",
  "defectiveskein",
  "buoyantmutation",
  "pricklythought",
  "dependentcohort",
  "piercingnetwork",
  "pawmew",
  "tablegrist",
  "limbsquad",
  "ligamenttribe"
];

const movieIdList = [
  764, 11906, 765, 766, 9003, 30497, 10331, 948, 923, 609, 377, 4488, 794, 1091, 10925,
  9426, 7340, 10072, 9725, 10014, 9538, 8913, 11281, 790, 16871, 16281, 176, 215, 214,
  9532, 565, 9358, 1690, 4232, 23827, 9373, 588, 19912, 9792, 9552, 170, 49018, 2667,
  9392, 522681, 512196, 458723, 287424, 442249, 298250, 460885, 460019, 76617, 157433,
  3035, 10320, 393519, 439079
];

const commentList = [
  "Loved it.",
  "Too scary.",
  "Didn't care for it.",
  "So-so.",
  "See it!",
  "You'll like this one.",
  "Not very good.",
  "Too gory.",
  "Very gory!",
  "Left this reviewer cold.",
  "Saw it twice.",
  "It's one of those movies.",
  "So bad it's good.",
  "Funny in all the wrong ways.",
  "I laughed a lot.",
  "Great!",
  "Yess!!!",
];

async function seedDB(users, reviews) {
  try {

    await db.User.deleteMany({});
    var data = await db.User.collection.insertMany(users);
    console.log(data.result.n + " user records inserted!");

    await db.Review.deleteMany({});
//    data = await db.Review.collection.insertMany(reviews);
//    console.log(data.result.n + " review records inserted!");

    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}


var userSeed = [];
var reviewSeed = [];
for (user of userList) {

  var watched = [];
  var wanted = [];

  for (id of movieIdList) {
    var randNum = Math.floor(Math.random() * 5);
    if (randNum < 2) {

      var quality = Math.floor(Math.random() * 5) + 1;
      var entertainment = Math.floor(Math.random() * 5) + 1;
      var scariness = Math.floor(Math.random() * 5) + 1;

      var commentRand = Math.floor(Math.random() * 3);
      var comment = "";
      if (commentRand < 2) {
        var randIndex = Math.floor(Math.random() * commentList.length);
        comment = commentList[randIndex];
      }

      var review = {
        userName: user,
        movieId: id,
        quality: quality,
        entertainment: entertainment,
        scariness: scariness,
        comment: comment
      }
      reviewSeed.push(review);

      watched.push(id);
    } else {
      wanted.push(id);
    }
  }

  var userProfile = {
    userName: user,
    password: "password",
    watched: watched,
    wanted: wanted
  };
  userSeed.push(userProfile);
}

seedDB(userSeed, reviewSeed);