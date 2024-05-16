const debug = require("debug")("eventbunny:eventsController");
const Event = require("../../models/event");

//TODO extract user ID after login (via localstorage or smth)
const userId = "66437eb544226e2ba77a44eb";
const userId2 = "66437eba44226e2ba77a44ed";

const index = async (req, res) => {
	try {
		const events = await Event.find()
			.populate("host", "name")
			.populate("attendees", "name");
		res.status(200).json(events);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getOne = async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId).populate("host");
		if (!event) {
			return res.status(404).json({ error: "event not found" });
		}
		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const create = async (req, res) => {
	try {
		const body = req.body;
		//host userId is already in body, dont need to add
		// body.host = userId;
		debug("body %o:", body);
		const event = await Event.create(body);
		res.status(201).json(event);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const userIndex = async (req, res) => {
	try {
		const eventsHosted = await Event.find({ host: userId });
		const eventsAttending = await Event.find({ attendees: userId });
		const events = { eventsHosted, eventsAttending };
		debug("events %o:", events);
		res.status(200).json(events);
	} catch (error) {
		res.status(500).json({ error });
	}
};

//TODO get userID from body.
const join = async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId);
		if (!event) {
			return res.status(404).json({ error: "event not found" });
		}
		if (event.attendees.includes(userId2)) {
			event.attendees.pop(userId2);
			await event.save();
			return res.status(200).json(event);
		}
		event.attendees.push(userId2);
		await event.save();
		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const edit = async (req, res) => {
	try {
		// more efficient, but less flexibility. also need to set {new:true, runValidators:true}
		// const event = await Event.findByIdAndUpdate(req.params.eventId , req.body);
		const event = await Event.findById(req.params.eventId);
		if (!event) {
			return res.status(404).json({ error: "event not found" });
		}
		const { name, location, datetime } = req.body;
		event.name = name;
		event.location = location;
		event.datetime = datetime;
		await event.save();
		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const deleteOne = async (req, res) => {
	try {
		const event = await Event.findByIdAndDelete(req.params.eventId);
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}
		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error: "Error deleting event" });
	}
};

module.exports = {
	create,
	index,
	userIndex,
	join,
	edit,
	deleteOne,
	getOne,
};
