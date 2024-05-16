import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../utilities/events-api";
import { getTasks } from "../../utilities/tasks-api";

export default function EventDetailsPage() {
	const [event, setEvent] = useState({});
	const [tasks, setTasks] = useState([]);
	const { eventId } = useParams();

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
							{task.name} - {task.assignee}
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
