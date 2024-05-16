import { useEffect } from "react";
import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { addTask } from "../../utilities/tasks-api";
import { useParams } from "react-router-dom";
import { getTasks } from "../../utilities/tasks-api";

export default function TaskSetupPage({ setTasks, tasks }) {
	const { eventId } = useParams();

	useEffect(() => {
		const fetchTasks = async () => {
			const tasks = await getTasks(eventId);
			setTasks(tasks);
		};
		fetchTasks();
	}, [eventId, setTasks]);

	const handleSave = async (event) => {
		//save task into db and state
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		console.log("data: %o", data);
		const taskData = { ...data, event: eventId };
		console.log(taskData);
		await addTask(taskData, eventId); //from tasks-api.js
		setTasks([...tasks, data]);
	};

	const onSubmit = () => {
		console.log("submitted");
		// need to join tasks into event
		console.log(tasks);
		//await join(tasks); //from tasks-api.js
	};

	return (
		<div>
			<br />
			<EventNavBar />
			<p>TASKSETUP</p>
			<form onSubmit={handleSave}>
				<label htmlFor="name">Task Name</label>
				<input type="text" name="name" />
				<br />
				<label htmlFor="assignee">Assignee</label>
				<input type="text" name="assignee" />
				<br />
				<button type="submit">SAVE</button>
			</form>
			<br />
			<button onClick={onSubmit}>SUBMIT EVENT</button>
			<div>
				<ul>
					{tasks.map((task) => (
						<li key={task.name}>
							{task.name} - {task.assignee}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
