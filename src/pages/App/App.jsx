import debug from "debug";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import EventSetupPage from "../EventSetupPage/EventSetupPage";
import TaskSetupPage from "../TaskSetupPage/TaskSetupPage";

const log = debug("mern:pages:App:App");

function App() {
	const [user, setUser] = useState(getUser());
	// const [events, setEvents] = useState([]); // need to pass in getEvents for state
	const [tasks, setTasks] = useState([]); // need to pass in getTasks for state

	log("user %o", user);

	if (!user) {
		return (
			<main className="App">
				<AuthPage setUser={setUser} />
			</main>
		);
	}

	return (
		<main className="App">
			<NavBar setUser={setUser} />
			<Link to="/events/create">Create new event</Link>
			<Routes>
				<Route path="/events/create" element={<EventSetupPage />} />
				<Route
					path="/events/:eventID/tasks/new"
					element={<TaskSetupPage setTasks={setTasks} tasks={tasks} />}
				/>
			</Routes>
		</main>
	);
}

export default App;
