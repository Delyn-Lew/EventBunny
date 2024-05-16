const debug = require("debug")("eventbunny:eventsController");
const Event = require("../../models/event");

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
		// host userId is already in body, dont need to add
		// body.host = userId;
		debug("body %o:", body);
		const event = await Event.create(body);
		res.status(201).json(event);
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
		const { name, description, location, date } = req.body;
		event.name = name;
		event.description = description;
		event.location = location;
		event.date = date;
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

const userIndex = async (req, res) => {
	try {
		//TODO need to make sure i pass userId in from client side.
		const { userId } = req.body;
		const eventsHosted = await Event.find({ host: userId });
		const eventsAttending = await Event.find({ attendees: userId });
		const events = { eventsHosted, eventsAttending };
		debug("events %o:", events);
		res.status(200).json(events);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const join = async (req, res) => {
	try {
		//TODO need to make sure i pass userId in from client side.
		const { userId } = req.body;
		//TODO check if eventId is already in body too.
		const event = await Event.findById(req.params.eventId);
		if (!event) {
			return res.status(404).json({ error: "event not found" });
		}
		if (event.attendees.includes(userId)) {
			event.attendees.pop(userId);
			await event.save();
			return res.status(200).json(event);
		}
		event.attendees.push(userId);
		await event.save();
		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	create,
	index,
	userIndex,
	join,
	edit,
	deleteOne,
};
