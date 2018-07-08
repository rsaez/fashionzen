const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// Add Imported API Routes and add the "/api" part the the URL request
router.use("/api", apiRoutes);

// If no API routes are hit then send back to the React app by default
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
