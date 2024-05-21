const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/api/eventsController");
const tasksCtrl = require("../../controllers/api/tasksController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

//[ensureLoggedIn] middleware is required for all routes to prevent indirect access (bruno/postman/insomnia etc)

//* ALL server routes here start with /api/events
//EVENTS
router.get("/", [ensureLoggedIn], eventsCtrl.index);
router.post("/", [ensureLoggedIn], eventsCtrl.create);
//getting all the user's events. // the user routes needs to be on top all the routes with params
router.get("/user", [ensureLoggedIn], eventsCtrl.userIndex);
router.get("/:eventId", [ensureLoggedIn], eventsCtrl.getOne);
router.put("/:eventId", [ensureLoggedIn], eventsCtrl.edit);
router.delete("/:eventId", [ensureLoggedIn], eventsCtrl.deleteOne);
router.patch("/:eventId", [ensureLoggedIn], eventsCtrl.join);
//TASKS
router.get("/:eventId/tasks", [ensureLoggedIn], tasksCtrl.index);
router.post("/:eventId/tasks", [ensureLoggedIn], tasksCtrl.create);
router.put("/:eventId/tasks/:taskId", [ensureLoggedIn], tasksCtrl.edit);
router.delete("/:eventId/tasks/:taskId", [ensureLoggedIn], tasksCtrl.deleteOne);

module.exports = router;
