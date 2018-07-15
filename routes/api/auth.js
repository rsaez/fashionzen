const router = require("express").Router();
const userController = require("../../controllers/userController");
const userSessionController = require("../../controllers/userSessionController");

// Matches with "/api/auth/signup
router.route("/signup")
.post(userController.create);

// Matches with "/api/auth/signin/
router.route("/signin")
.post(userSessionController.findOne);

// Matches with "/api/auth/logout/
router.route("/logout")
.get(userSessionController.deleteToken);

// Matches with "/api/auth/verify/
router.route("/verify")
.get(userSessionController.verify);

module.exports = router;
