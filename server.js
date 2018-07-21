const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
//const PORT = process.env.PORT || 3001;

// Define middleware here, set extended to true so you can post "nested objects" and make it work with json too
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets for production deployment (On Heroku in this case)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Have every API or view request go through the router middleware
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fashionzen");

// Start the API server
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
// app.listen(PORT, function() {
//   console.log(`API Server now listening on PORT ${PORT}!`);
// });
