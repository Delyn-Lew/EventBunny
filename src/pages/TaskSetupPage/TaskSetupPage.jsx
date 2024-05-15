import EventNavBar from "../../components/EventNavBar/EventNavBar";

export default function TaskSetupPage({ setTasks, tasks }) {
	const handleSave = async (event) => {
		//save task into db and state
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		console.log("data: %o", data);
		setTasks([...tasks, data]);
	};

	const onSubmit = () => {
		console.log("submitted");
		// need to join tasks into event
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
						<li key={task.taskname}>
							{task.taskname} - {task.assignee}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
