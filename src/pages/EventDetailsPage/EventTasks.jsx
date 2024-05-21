import { getTasks } from "../../utilities/tasks-api";
import { useEffect, useState } from "react";

export default function EventTasks({ eventId }) {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		async function fetchTasks() {
			const tasks = await getTasks(eventId);
			setTasks(tasks);
		}
		fetchTasks();
	}, [eventId]);

	return (
		<>
			{tasks.map((task) => (
				<li key={task._id}>
					{task.name} - {task.assignee.name} - {task.status}
				</li>
			))}
		</>
	);
}
