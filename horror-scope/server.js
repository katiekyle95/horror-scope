const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/userController");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
// express
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Serve up static assets 

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.post('/login', function (req, res) {
    var user_name = req.body.userName;
    var password = req.body.password;
    userController.auth(req, res);
  });
  
  app.post('/signup', function (req, res) {
    var user_name = req.body.userName;
    var password = req.body.password;
    userController.signUp(req, res);
  });

// Add routes
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/horrorscope", {useNewUrlParser: true});

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});