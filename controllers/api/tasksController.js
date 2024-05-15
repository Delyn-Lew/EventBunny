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

const edit = async (req, res) => {
	try {
		// more efficient, but less flexibility. also need to set {new:true, runValidators:true}
		// const task = await Task.findByIdAndUpdate(req.params.taskId, req.body);
		const task = await Task.findById(req.params.taskId);
		debug("task %o:", task);
		const { name, status, delegated } = req.body;
		task.name = name;
		task.status = status;
		task.delegated = delegated;
		await task.save();
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const deleteOne = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.taskId);
		if (!task) {
			return res.status(404).json({ error: "Task not found" });
		}
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ error: "Error deleting task" });
	}
};

module.exports = {
	create,
	index,
	edit,
	deleteOne,
};
