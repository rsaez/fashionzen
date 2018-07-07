const router = require("express").Router();
const closetRoutes = require("./closet");

// add the closet routes and add the "/closet" to the url
router.use("/closet", closetRoutes);

module.exports = router;
