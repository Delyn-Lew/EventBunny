const Task = require("../../models/task");

const create = async (req, res) => {
	const eventId = req.params.eventId;
	const { name, assignee } = req.body;
	try {
		const task = await Task.create({ name, assignee, eventId });
		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = { create };
