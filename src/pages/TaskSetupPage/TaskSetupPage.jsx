import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { addTask } from "../../utilities/tasks-api";
import { useParams } from "react-router-dom";
import debug from "debug";
const log = debug("eventbunny:pages:TaskSetupPage");

export default function TaskSetupPage({ setTasks, tasks }) {
	const { eventId } = useParams();
	log("eventId %s:", eventId);
	const handleSave = async (event) => {
		//save task into db and state
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		log("data: %o", data);
		const taskData = { ...data, event: eventId };
		log("taskdata: %o", taskData);
		await addTask(taskData, eventId); //from tasks-api.js
		setTasks([...tasks, data]);
	};

	const onSubmit = () => {
		// need to join tasks into event
		log("task: %o", tasks);
		//await join(tasks); //from tasks-api.js
	};

	return (
		<div>
			<br />
			<EventNavBar />
			<p>TASKSETUP</p>
			<form onSubmit={handleSave}>
				<label htmlFor='name'>Task Name</label>
				<input type='text' name='name' />
				<br />
				<label htmlFor='assignee'>Assignee</label>
				<input type='text' name='assignee' />
				<br />
				<button type='submit'>SAVE</button>
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
