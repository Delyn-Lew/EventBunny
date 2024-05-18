import debug from "debug";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import EventOverviewPage from "../EventOverviewPage/EventOverviewPage";
import EventSetupPage from "../EventSetupPage/EventSetupPage";
import TaskSetupPage from "../TaskSetupPage/TaskSetupPage";
import EventDetailsPage from "../EventDetailsPage/EventDetailsPage";
import "../../index.css";

const log = debug("eventbunny:pages:App:App");

function App() {
	const [user, setUser] = useState(getUser());
	const [tasks, setTasks] = useState([]);
	const navigate = useNavigate();
	log("user %o", user);

	useEffect(() => {
		if (!user) {
			navigate("/auth");
		}
	}, [user, navigate]);

	if (!user) {
		return (
			<main className="App">
				<AuthPage setUser={setUser} />
			</main>
		);
	}

	return (
		<main className="App">
			<NavBar setUser={setUser} user={user} />
			<Routes>
				<Route index element={<Navigate to="/auth" replace />} />
				<Route path="/auth" element={<AuthPage setUser={setUser} />} />
				<Route
					path="/events/create"
					element={<EventSetupPage userID={user["_id"]} />}
				/>
				<Route
					path="/events/:eventId/tasks/new"
					element={<TaskSetupPage setTasks={setTasks} tasks={tasks} />}
				/>
				<Route path="/dashboard" element={<EventOverviewPage />} />
				<Route path="/events/:eventId" element={<EventDetailsPage />} />
				<Route path="/events/edit/:eventId" element={<EventSetupPage />} />
				<Route
					path="/events/:eventId/tasks/edit"
					element={<TaskSetupPage setTasks={setTasks} tasks={tasks} />}
				/>
			</Routes>
		</main>
	);
}

export default App;
