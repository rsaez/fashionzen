const router = require("express").Router();
const closetRoutes = require("./closet");
const authRoutes = require("./auth");

// add the closet routes and add the "/closet" to the url
router.use("/closet", closetRoutes);
router.use("/auth", authRoutes);

module.exports = router;
