import { useEffect } from "react";
import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { addTask } from "../../utilities/tasks-service";
import debug from "debug";
const log = debug("eventbunny:pages:TaskSetupPage");
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTasks, updateTask } from "../../utilities/tasks-service";

export default function TaskSetupPage({ setTasks, tasks }) {
	const { eventId } = useParams();
	log("eventId %s:", eventId);
	const navigate = useNavigate();
	const isEditPage = window.location.pathname.endsWith("/edit");

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
		log("data: %o", data);
		const taskData = { ...data, event: eventId };
		log("taskdata: %o", taskData);
		await addTask(taskData, eventId);
		setTasks([...tasks, data]);
	};

	const handleSubmit = () => {
		navigate(`/events/${eventId}`);
	};

	const handleUpdate = async (taskId, eventId, data) => {
		console.log(data.status);
		event.preventDefault();
		console.log(taskId, eventId, data);
		data.status = data.status ? "completed" : "incomplete";
		await updateTask(taskId, eventId, data);
		navigate(`/events/${eventId}/tasks/edit`);
	};

	return (
		<div>
			<br />
			<EventNavBar />
			<p>TASKSETUP</p>
			{!isEditPage ? (
				<form onSubmit={handleSave}>
					<label htmlFor="name">Task Name</label>
					<input type="text" name="name" id="name" />
					<br />
					<label htmlFor="assignee">Assignee</label>
					<input type="text" name="assignee" id="assignee" />
					<br />
					<label htmlFor="status">Status</label>
					<input type="checkbox" name="status" id="status" />
					<p
						style={{ color: "slategray", fontSize: "10px", lineHeight: "0px" }}
					>
						(check the box if completed)
					</p>

					<button type="submit">SAVE</button>
				</form>
			) : (
				<Link to={`/events/${eventId}/tasks/new`}>
					<button>Go to task creation page</button>
				</Link>
			)}

			<br />
			<button onClick={handleSubmit}>PROCEED</button>
			<div>
				{isEditPage ? (
					<div>
						{tasks?.map((task, idx) => (
							<form
								onSubmit={() => handleUpdate(task._id, eventId, task)}
								key={task.name}
							>
								<label htmlFor="name">Task Name</label>
								<input
									type="text"
									name="name"
									value={task.name}
									onChange={(evt) =>
										setTasks(
											tasks.map((item, index) =>
												index === idx
													? { ...item, name: evt.target.value }
													: item
											)
										)
									}
								/>
								<label htmlFor="assignee">Assignee</label>
								<input
									type="text"
									name="assignee"
									value={task?.assignee}
									onChange={(evt) =>
										setTasks(
											tasks.map((item, index) =>
												index === idx
													? { ...item, assignee: evt.target.value }
													: item
											)
										)
									}
								/>
								<label htmlFor="status">Status</label>
								<input
									type="checkbox"
									name="status"
									value={task?.status}
									onChange={() =>
										setTasks(
											tasks.map((item, index) =>
												index === idx ? { ...item, status: !item.status } : item
											)
										)
									}
								/>
								<button type="submit">UPDATE</button>
							</form>
						))}
					</div>
				) : (
					<ul>
						{tasks?.map((task) => (
							<li key={task.name}>
								{task.name} - {task.assignee} - {task.status}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
