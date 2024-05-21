const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		name: { type: String, required: true },
		status: {
			type: String,
			enum: ["incomplete", "completed"],
			default: "incomplete",
		},
		assignee: { type: Schema.Types.ObjectId, ref: "User" },
		event: { type: Schema.Types.ObjectId, ref: "Event" },
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Task", taskSchema);
