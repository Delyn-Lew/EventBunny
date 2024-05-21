export default function EventTasks({ task }) {
	return (
		<li>
			{task.name} - {task.assignee?.name} - {task.status}
		</li>
	);
}
