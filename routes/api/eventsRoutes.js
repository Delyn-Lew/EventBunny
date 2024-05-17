const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/api/eventsController");
const tasksCtrl = require("../../controllers/api/tasksController");

//TODO check if [ensureLoggedIn] middleware is required for all routes
//TODO server already did check in app.use checkTokenMiddleWare ??
// const ensureLoggedIn = require("../../config/ensureLoggedIn");
// router.get("/check-token", [ensureLoggedIn], usersCtrl.checkToken);

//* ALL server routes here start with /api/events
//EVENTS
router.get("/", eventsCtrl.index);
router.post("/", eventsCtrl.create);
router.get("/:eventId", eventsCtrl.getOne);
router.put("/:eventId", eventsCtrl.edit);
//getting all the user's events
router.delete("/:eventId", eventsCtrl.deleteOne);
router.post("/:eventId/join", eventsCtrl.join);
//should the route just be /:eventId/edit or ???? without /edit
router.get("/user", eventsCtrl.userIndex);

//TASKS
//TODO UPDATE/DELETE for events & tasks, need taskID for task
router.get("/:eventId/tasks", tasksCtrl.index);
router.post("/:eventId/tasks", tasksCtrl.create);
router.put("/:eventId/tasks/:taskId", tasksCtrl.edit);
router.delete("/:eventId/tasks/:taskId", tasksCtrl.deleteOne);

module.exports = router;
