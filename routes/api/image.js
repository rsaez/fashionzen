const router = require("express").Router();
const imageController = require("../../controllers/imageController");

// Matches with "/api/image"
router.route("/")
  .post(imageController.addImage)
  .get(imageController.readImage);

module.exports = router;