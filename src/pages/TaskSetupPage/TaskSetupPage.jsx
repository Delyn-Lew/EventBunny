import { useEffect } from "react";
import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { addTask } from "../../utilities/tasks-api";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks } from "../../utilities/tasks-api";

export default function TaskSetupPage({ setTasks, tasks }) {
	const { eventId } = useParams();
	const navigate = useNavigate();

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
		data.status = data.status ? "completed" : "incomplete";
		console.log("data: %o", data);
		const taskData = { ...data, event: eventId };
		console.log(taskData);
		await addTask(taskData, eventId); //from tasks-api.js
		setTasks([...tasks, data]);
	};

	const handleSubmit = () => {
		navigate(`/events/${eventId}`);
	};

	return (
		<div>
			<br />
			<EventNavBar />
			<p>TASKSETUP</p>
			<form onSubmit={handleSave}>
				<label htmlFor="name">Task Name</label>
				<input type="text" name="name" id="name" />
				<br />
				<label htmlFor="assignee">Assignee</label>
				<input type="text" name="assignee" id="assignee" />
				<br />
				<label htmlFor="status">Status</label>
				<input type="checkbox" name="status" id="status" />
				<p style={{ color: "slategray", fontSize: "10px", lineHeight: "0px" }}>
					(check the box if completed)
				</p>

				<button type="submit">SAVE</button>
			</form>
			<br />
			<button onClick={handleSubmit}>SUBMIT EVENT</button>
			<div>
				<ul>
					{tasks.map((task) => (
						<li key={task.name}>
							{task.name} - {task.assignee} - {task.status}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
