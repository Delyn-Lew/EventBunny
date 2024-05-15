const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/api/eventsController");
const tasksCtrl = require("../../controllers/api/tasksController");

//TODO check if we want [ensureLoggedIn] middleware to be required for all routes
//TODO server already did check in app.use checkTokenMiddleWare
// const ensureLoggedIn = require("../../config/ensureLoggedIn");
// router.get("/check-token", [ensureLoggedIn], usersCtrl.checkToken);

//* ALL server routes here start with /api/events
//TODO amend to follow CRUD convention
//EVENTS
router.get("/", eventsCtrl.index);
router.post("/", eventsCtrl.create);
router.get("/user", eventsCtrl.userIndex);
router.put("/:eventId/join", eventsCtrl.create);

//TASKS
router.get("/:eventId/tasks", tasksCtrl.index);
router.post("/:eventId/tasks", tasksCtrl.create);

module.exports = router;
