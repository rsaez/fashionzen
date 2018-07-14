const router = require("express").Router();
const userSessionController = require("../../controllers/userSessionController");

// Matches with "/api/signin/
router.route("/")
.post(userSessionController.create);

module.exports = router;
