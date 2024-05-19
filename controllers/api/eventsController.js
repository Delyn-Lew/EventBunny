const debug = require("debug")("eventbunny:eventsController");
const Event = require("../../models/event");

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
    const userId = req.query.userId;
    console.log("Receive userId", userId);
    const eventsHosted = await Event.find({ host: userId }).populate(
      "host attendees"
    );

    const eventsAttending = await Event.find({ attendees: userId }).populate(
      "host attendees"
    );

    const events = { eventsHosted, eventsAttending };
    debug("events %o:", events);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const join = async (req, res) => {
  try {
    const { userId } = req.body;
    const eventId = req.params.eventId;
    debug(`Joining event with ID: ${eventId} by user ID: ${userId}`);
    const event = await Event.findById(eventId).populate("host");
    if (!event) {
      debug(`Event not found: ${eventId}`);
      return res.status(404).json({ error: "event not found" });
    }
    const isAttendee = event.attendees.includes(userId);

    if (isAttendee) {
      event.attendees = event.attendees.filter(
        (attendee) => attendee.toString() !== userId
      );
      debug(`User ${userId} left the event ${eventId}`);
    } else {
      event.attendees.push(userId);
      debug(`User ${userId} joined the event ${eventId}`);
    }

    await event.save();
    const updateEvent = await Event.findById(eventId).populate("host");
    res.status(200).json(updateEvent);
  } catch (error) {
    debug(`Error joining event: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
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
