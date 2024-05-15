const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		name: { type: String, required: true },
		location: { type: String },
		datetime: { type: Date },
		host: { type: Schema.Types.ObjectId, ref: "User" },
		attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Event", eventSchema);
