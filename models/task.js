const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	name: { type: String, required: true },
	assignee: { type: String, required: true },
	eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true }, 
});

module.exports = mongoose.model("Task", taskSchema);
