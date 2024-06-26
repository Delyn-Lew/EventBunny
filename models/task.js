const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		name: { type: String, required: true, trim: true, minlength: 1 },
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

// taskSchema.pre(/^find/, function (next) {
// 	this.populate({ path: "assignee", select: "name" });
// 	this.sort({ "assignee.name": 1 });
// 	next();
// });

module.exports = mongoose.model("Task", taskSchema);
