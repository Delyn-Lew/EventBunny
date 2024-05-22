export default function TaskList({ task }) {
	return (
		<li
			className="px-5 py-3 w-2/3 text-center mb-2 bg-white bg-opacity-80 rounded-lg drop-shadow-xl shadow-inner border-2"
			key={task?._id}
		>
			{task.name} - {task.assignee.name || task.user?.name} - {task.status}
		</li>
	);
}
