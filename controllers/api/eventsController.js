const Event = require("../../models/event");

const create = async (req, res) => {
	const { name, description, date, location, host } = req.body;

	try {
		const event = await Event.create({
			name,
			description,
			date,
			location,
			host,
		});
		res.status(201).json(event);
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	create,
};
