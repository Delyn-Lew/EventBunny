const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		event: { type: Schema.Types.ObjectId, ref: "Event" },
		name: { type: String, required: true },
		status: {
			type: String,
			enum: ["incomplete", "completed"],
			default: "incomplete",
		},
		delegated: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Task", taskSchema);
