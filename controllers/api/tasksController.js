const debug = require("debug")("eventbunny:taskController");
const Task = require("../../models/task");

const index = async (req, res) => {
	try {
		const tasks = await Task.find({ event: req.params.eventId }).populate("delegated", "name");
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const create = async (req, res) => {
	try {
		const body = req.body;
		body.event = req.params.eventId;
		debug("body %o:", body);
		const task = await Task.create(body);
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	create,
	index,
};
