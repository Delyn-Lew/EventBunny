import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../../utilities/events-api";
import { getTasks } from "../../utilities/tasks-api";
import { getUser } from "../../utilities/users-service";
import debug from "debug";
const log = debug("eventbunny:pages:EventDetailsPage");

export default function EventDetailsPage({ admin }) {
	const [event, setEvent] = useState({});
	const [tasks, setTasks] = useState([]);
	const { eventId } = useParams();
	const user = getUser();
	log("user_id", user?._id);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchEvent() {
			const event = await getEvent(eventId);
			setEvent(event);
		}
		fetchEvent();
		async function fetchTasks() {
			const tasks = await getTasks(eventId);
			setTasks(tasks);
		}
		fetchTasks();
	}, [eventId]);

	const localDate = new Date(event.date).toLocaleString();

	return (
		<>
			<h1>{event.name}</h1>
			<section>
				{event.host?._id === user?._id || admin ? (
					<button
						onClick={() => {
							navigate(`/events/edit/${eventId}`);
						}}>
						Edit Event
					</button>
				) : (
					<p>This is not your event to Edit, look for {event.host?.name}</p>
				)}
				<p>{event.description}</p>
				<p>DATE: {localDate}</p>
				<p>LOCATION: {event.location}</p>
				<p>HOST: {event.host?.name}</p>
			</section>
			<h2>Tasks</h2>
			<section>
				<ul>
					{tasks.map((task) => (
						<li key={task.name}>
							{task.name} - {task.assignee} - {task.status}
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
