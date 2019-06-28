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
app.use(expredd.json());

// Serve up static assets 

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Add routes
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/horrorscope", {useNewUrlParser: true});

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});