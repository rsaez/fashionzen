const router = require("express").Router();
const closetController = require("../../controllers/closetController");

// Matches with "/api/closet"
router.route("/")
  .get(closetController.findAll)
  .post(closetController.create);

// TODO: will Matches with "/api/closet/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
