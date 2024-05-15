const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/api/eventsController");

router.post("/", eventsCtrl.create);

module.exports = router;
