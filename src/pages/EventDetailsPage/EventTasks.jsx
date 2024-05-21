import { getTasks } from "../../utilities/tasks-api";
import { useEffect } from "react";

export default function EventTasks({ task, setTasks, eventId }) {
	useEffect(() => {
		async function fetchTasks() {
			const tasks = await getTasks(eventId);
			setTasks(tasks);
		}
		fetchTasks();
	});

	return (
		<li>
			{task.name} - {task.assignee?.name} - {task.status}
		</li>
	);
}
