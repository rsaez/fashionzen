const router = require("express").Router();
const closetRoutes = require("./closet");
const userRoutes = require("./signup");

// add the closet routes and add the "/closet" to the url
router.use("/closet", closetRoutes);
router.use("/signup", userRoutes);

module.exports = router;
