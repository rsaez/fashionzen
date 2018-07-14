const router = require("express").Router();
const closetRoutes = require("./closet");
const userRoutes = require("./signup");
const userSessionRoutes = require("./signin");

// add the closet routes and add the "/closet" to the url
router.use("/closet", closetRoutes);
router.use("/signup", userRoutes);
router.use("/signin", userSessionRoutes);

module.exports = router;
