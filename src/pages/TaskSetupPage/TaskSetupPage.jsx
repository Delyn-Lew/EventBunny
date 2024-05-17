import { useEffect, useState } from "react";
import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { addTask } from "../../utilities/tasks-service";
import debug from "debug";
const log = debug("eventbunny:pages:TaskSetupPage");
import { useParams, useNavigate } from "react-router-dom";
import {
	getTasks,
	updateTask,
	deleteTask,
} from "../../utilities/tasks-service";
import { getUsers } from "../../utilities/users-service";

export default function TaskSetupPage({ setTasks, tasks }) {
	const [users, setUsers] = useState([]);
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

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setUsers(users);
		};
		fetchUsers();
	}, [setUsers]);

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

	const handleChange = (field, idx) => (event) => {
		const newTasks = [...tasks];
		newTasks[idx][field] = event.target.value;
		setTasks(newTasks);
	};

	const handleUpdate = async (taskId, eventId, data) => {
		event.preventDefault();
		console.log("update", taskId, eventId, data);
		await updateTask(taskId, eventId, data);
		navigate(`/events/${eventId}/tasks/edit`);
	};

	const handleDelete = async (taskId, eventId) => {
		event.preventDefault();
		await deleteTask(taskId, eventId);
		setTasks(tasks.filter((task) => task._id !== taskId));
		navigate(`/events/${eventId}/tasks/edit`);
	};

	return (
		<div>
			<br />
			<EventNavBar />
			<p>TASKSETUP</p>
			{!isEditPage && (
				<form onSubmit={handleSave}>
					<label htmlFor="name">Task Name</label>
					<input type="text" name="name" id="name" />
					<br />
					<label htmlFor="assignee">Assignee</label>
					<select name="assignee" id="assignee">
						{users?.map((user) => (
							<option value={user.name} key={user._id}>
								{user.name}
							</option>
						))}
					</select>
					<br />
					<label htmlFor="status">Status</label>
					<select name="status" id="status">
						<option value="incomplete">incomplete</option>
						<option value="completed">completed</option>
					</select>
					<p
						style={{ color: "slategray", fontSize: "10px", lineHeight: "0px" }}
					>
						(check the box if completed)
					</p>

					<button type="submit">SAVE</button>
				</form>
			)}

			<br />
			<button onClick={handleSubmit}>PROCEED</button>
			<div>
				{isEditPage ? (
					<div>
						{tasks?.map((task, idx) => (
							<form
								onSubmit={() => handleUpdate(task._id, eventId, task)}
								key={task._id}
							>
								<label htmlFor="name">Task Name</label>
								<input
									type="text"
									name="name"
									value={task.name}
									onChange={handleChange("name", idx)}
								/>
								<label htmlFor="assignee">Assignee</label>
								<select
									onChange={handleChange("assignee", idx)}
									name="assignee"
									id="assignee"
								>
									{users?.map((user) => (
										<option value={user.name} key={user._id}>
											{user.name}
										</option>
									))}
								</select>
								<label htmlFor="status">Status</label>
								<select
									onChange={handleChange("status", idx)}
									name="status"
									id="status"
									value={task.status}
								>
									<option value="incomplete">incomplete</option>
									<option value="completed">completed</option>
								</select>
								<button type="submit">UPDATE</button>
								<button
									onClick={() => handleDelete(task._id, eventId)}
									type="button"
								>
									DELETE
								</button>
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
