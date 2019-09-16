const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user/:name"
router.route("/:name")
    .get(userController.profile)

// Matches with "/api/user/:name/watched/:movieId"
router.route("/:name/watched/:movieId")
    .post(userController.watched)

// Matches with "/api/user/:name/wanted/:movieId"
router.route("/:name/wanted/:movieId")
    .post(userController.wanted)

// Matches with "/api/user/:name/clear/:movieId"
router.route("/:name/clear/:movieId")
    .post(userController.clear)

module.exports = router;