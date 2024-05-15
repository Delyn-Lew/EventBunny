const express = require("express");
const router = express.Router();
const { create } = require("../../controllers/api/tasksController");

router.post("/:eventId/tasks", create);
module.exports = router;
