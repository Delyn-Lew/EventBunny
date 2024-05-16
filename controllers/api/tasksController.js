const debug = require("debug")("eventbunny:taskController");
const Task = require("../../models/task");
const User = require("../../models/user");

const index = async (req, res) => {
	try {
		const tasks = await Task.find({ event: req.params.eventId }).populate(
			"delegated",
			"name"
		);
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error });
	}
};

//* ADDED conversion from name to userId
// TODO check status field if checkbox -> true/false or completed/incomplete
const create = async (req, res) => {
	try {
		// i have assignee in the client side, but  in 'name', need to convert'
		const { assignee } = req.body;
		const user = await User.find({ name: assignee });
		debug("user %o:", user);
		const body = req.body;
		body.delegated = user[0]._id;
		debug("body %o:", body);
		const task = await Task.create(body);
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ error });
	}
};

//* ADDED conversion from name to userId
const edit = async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId);
		debug("task %o:", task);
		const { name, status, assignee } = req.body;
		const user = await User.find({ name: assignee });
		task.name = name;
		task.status = status;
		task.assignee = assignee;
		task.delegated = user[0]._id;
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
