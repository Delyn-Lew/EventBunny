const debug = require("debug")("eventbunny:eventsController");
const Event = require("../../models/event");

//TODO extract user ID after login (via localstorage or smth)
const userId = "66437eb544226e2ba77a44eb";
const userId2 = "66437eba44226e2ba77a44ed";

const index = async (req, res) => {
	try {
		const events = await Event.find().populate("host", "name").populate("attendees", "name");
		res.status(200).json(events);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const create = async (req, res) => {
	try {
		const body = req.body;
		body.host = userId;
		debug("body %o:", body);
		const event = await Event.create(body);
		res.status(201).json(event);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const userIndex = async (req, res) => {
	const eventsHosted = await Event.find({ host: userId });
	const eventsAttending = await Event.find({ attendees: userId });
	const events = { eventsHosted, eventsAttending };
	debug("events %o:", events);
	res.status(200).json(events);
};

const join = async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId);
		if (!event) {
			return res.status(404).json({ error: "event not found" });
		}
		if (event.attendees.includes(userId2)) {
			//TODO change this to toggle push or pop
			//TODO change this to follow CRUD convention
			return res.status(400).json({ error: "user is already attending event" });
		}
		event.attendees.push(userId2);
		await event.save();
		res.status(201).json(event);
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	create,
	index,
	userIndex,
	join,
};
