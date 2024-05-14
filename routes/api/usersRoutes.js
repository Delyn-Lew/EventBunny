const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/users
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
// GET /api/users/check-token ->insert ensureLoggedIn on all routes that need protecting
router.get("/check-token", [ensureLoggedIn], usersCtrl.checkToken);

module.exports = router;
