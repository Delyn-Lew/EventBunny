import debug from "debug";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import EventOverviewPage from "../EventOverviewPage/EventOverviewPage";
import EventSetupPage from "../EventSetupPage/EventSetupPage";
import TaskSetupPage from "../TaskSetupPage/TaskSetupPage";
import EventDetailsPage from "../EventDetailsPage/EventDetailsPage";
import UserTimeout from "../../components/UserTimeout/UserTimeout";
import "../../index.css";
import MyEventsPage from "../MyEventsPage/MyEventsPage";

const log = debug("eventbunny:pages:App:App");
const adminId = "6648af5a0faf91beeab53496"; //move this to .env file

function App() {
	const [user, setUser] = useState(getUser());
	const [tasks, setTasks] = useState([]);
	const [showTimeout, setShowTimeout] = useState(false);
	//eslint-disable-next-line no-unused-vars
	const admin = user?._id == adminId;

	log("user %o", user);
	log("admin %s", admin);

	if (!user) {
		return (
			<main className='App'>
				<AuthPage setUser={setUser} />
			</main>
		);
	}

	return (
		<main className='App'>
			<Routes>
				<Route path='/' element={<AuthPage setUser={setUser} />} />
				<Route
					path='/timeout'
					element={
						<UserTimeout setUser={setUser} setShowTimeout={setShowTimeout}>
							<AuthPage setUser={setUser} />
						</UserTimeout>
					}
				/>

				<Route
					path='/*'
					element={
						showTimeout ? (
							<Navigate to='/timeout' replace />
						) : (
							<UserTimeout setUser={setUser}>
								{user && <NavBar user={user} setUser={setUser} />}
								<Routes>
									<Route path='/dashboard' element={<EventOverviewPage setShowTimeout={setShowTimeout} />} />
									<Route path='/user' element={<MyEventsPage />} />
									<Route path='/events/create' element={<EventSetupPage userID={user["_id"]} setShowTimeout={setShowTimeout} />} />
									<Route path='/events/edit/:eventId' element={<EventSetupPage setTasks={setTasks} setShowTimeout={setShowTimeout} />} />
									<Route path='/events/:eventId' element={<EventDetailsPage admin={admin} setTasks={setTasks} setShowTimeout={setShowTimeout} />} />
									<Route path='/events/:eventId/tasks/new' element={<TaskSetupPage setTasks={setTasks} tasks={tasks} setUser={setUser} setShowTimeout={setShowTimeout} />} />
									<Route path='/events/:eventId/tasks/edit' element={<TaskSetupPage setTasks={setTasks} tasks={tasks} setUser={setUser} setShowTimeout={setShowTimeout} />} />
								</Routes>
							</UserTimeout>
						)
					}
				/>
			</Routes>
		</main>
	);
}

export default App;
