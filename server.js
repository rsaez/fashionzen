const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets for production deployment (On Heroku in this case)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Have every API or view request go through the router middleware
app.use(routes);

// Connect to the Mongo DB
//TODO: look into a way to pass this code ", { useNewUrlParser: true }" && also need some way to handle a unhandled error when this is implemented, may go away when routes are finished
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fashionzen");


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
