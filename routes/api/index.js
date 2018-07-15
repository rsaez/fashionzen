const router = require("express").Router();
const closetRoutes = require("./closet");
const imageRoutes = require("./image");

// add the closet routes and add the "/closet" to the url
router.use("/closet", closetRoutes);
router.use("/image", imageRoutes);

module.exports = router;
