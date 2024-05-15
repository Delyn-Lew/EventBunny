const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		date: { type: Date, required: true },
		location: { type: String, required: true },
		host: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Event", eventSchema);
