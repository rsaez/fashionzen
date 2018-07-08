const router = require("express").Router();
const closetController = require("../../controllers/closetController");

// Matches with "/api/closet"
router.route("/")
  .get(closetController.findAll)
  .post(closetController.create);

module.exports = router;
