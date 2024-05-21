import { useEffect, useState } from "react";
import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { addTask } from "../../utilities/tasks-service";
import debug from "debug";
const log = debug("eventbunny:pages:TaskSetupPage");
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
	getTasks,
	updateTask,
	deleteTask,
} from "../../utilities/tasks-service";
import { getUser, getUsers } from "../../utilities/users-service";
import SmallInput from "../../components/Input/SmallInput";
import SmallButton from "../../components/Button/SmallButton";

export default function TaskSetupPage({ setTasks, tasks, setShowTimeout }) {
	const [users, setUsers] = useState([]);
	const { eventId } = useParams();
	log("eventId %s:", eventId);
	const navigate = useNavigate();
	const location = useLocation();
	const isEditPage = location.pathname.endsWith("/edit");

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
		event.preventDefault();
		const user = getUser();
		if (!user) {
			log("user not logged in");
			setShowTimeout(true);

			return;
		}

		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		const taskData = { ...data, event: eventId };
		await addTask(taskData, eventId);
		data.user = users.find((user) => user._id === data.assignee);
		setTasks([...tasks, data]);
		log("data: %o", data);
		log("taskdata: %o", taskData);
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
		
		const user = getUser();
		if (!user) {
			log("user not logged in");
			setShowTimeout(true);
			return;
		}

		log("update", taskId, eventId, data);
		await updateTask(taskId, eventId, data);
		navigate(`/events/${eventId}/tasks/edit`);
	};

	const handleDelete = async (taskId, eventId) => {
		
		const user = getUser();
		if (!user) {
			log("user not logged in");
			setShowTimeout(true);
			return;
		}

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
					<SmallInput type="text" name="name" id="name" />
					<br />
					<label htmlFor="assignee">Assignee</label>
					<select name="assignee" id="assignee">
						{users?.map((user) => (
							<option value={user._id} key={user._id}>
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
			<SmallButton onClick={handleSubmit}>PROCEED</SmallButton>
			<div>
				{isEditPage ? (
					<div>
						{tasks?.map((task, idx) => (
							<form
								onSubmit={() => handleUpdate(task._id, eventId, task)}
								key={task._id}
							>
								<label htmlFor="name">Task Name</label>
								<SmallInput
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
									value={task.assignee._id}
								>
									{users?.map((user) => (
										<option value={user._id} key={user._id}>
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
								<SmallButton type="submit">UPDATE</SmallButton>
								<SmallButton
									onClick={() => handleDelete(task._id, eventId)}
									type="button"
								>
									DELETE
								</SmallButton>
							</form>
						))}
					</div>
				) : (
					<ul>
						{tasks.map((task) => (
							<li key={task.name}>
								{task.name} - {task.status} -{" "}
								{task.assignee.name || task.user?.name}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
