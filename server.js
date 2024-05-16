const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("eventbunny:server");
// Always require and configure near the top
require("dotenv").config();
require("./config/database"); //for connecting to database

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(express.static(path.join(__dirname, "dist")));
//to be mount before routes
app.use(require("./config/checkToken").checkTokenMiddleware);

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/usersRoutes"));
app.use("/api/events", require("./routes/api/eventsRoutes"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	debug(`Express app running on port ${port}`);
});
