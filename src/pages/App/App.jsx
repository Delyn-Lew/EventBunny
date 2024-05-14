import debug from "debug";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
// import AuthPage from "../AuthPage/AuthPage";
import CreateEventPage from "../CreateEventPage/CreateEventPage";
import EventSetupPage from "../CreateEventPage/EventSetupPage/EventSetupPage";
import TaskSetupPage from "../CreateEventPage/TaskSetupPage/TaskSetupPage";

const log = debug("mern:pages:App:App");

function App() {
	const [user, setUser] = useState(getUser());
	log("user %o", user);

	// if (!user) {
	// 	return (
	// 		<main className="App">
	// 			<AuthPage setUser={setUser} />
	// 		</main>
	// 	);
	// }

	return (
		<main className="App">
			<NavBar setUser={setUser} />
			<Link to="/event/new">Create new event</Link>
			<Routes>
				<Route path="/event/new" element={<CreateEventPage />} />
				<Route path="/event/new/details" element={<EventSetupPage />} />
				<Route path="/event/:eventID/task/new" element={<TaskSetupPage />} />
			</Routes>
		</main>
	);
}

export default App;
