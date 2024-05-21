export default function TaskList({ task }) {
	return (
		<li key={task.name}>
			{task.name} - {task.status} - {task.assignee.name || task.user?.name}
		</li>
	);
}
