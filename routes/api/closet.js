const router = require("express").Router();
const closetController = require("../../controllers/closetController");

// Matches with "/api/closet"
router.route("/")
  .get(closetController.findAll)
  .post(closetController.create);

// Matches with "/api/closet/:id"
router
.route("/:id")
.delete(closetController.remove);


module.exports = router;
