const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		name: { type: String, required: true, trim: true, minlength: 1 },
		description: { type: String, required: true, trim: true, minlength: 1 },
		location: { type: String, required: true, trim: true, minlength: 1 },
		date: { type: Date },
		host: { type: Schema.Types.ObjectId, ref: "User" },
		attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
	}
);

eventSchema.pre(/^find/, function (next) {
	this.sort({ date: 1 });
	next();
});

module.exports = mongoose.model("Event", eventSchema);
