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
import SmallButton from "../../components/Button/SmallButton";
import TaskCreateForm from "./TaskCreateForm";
import TaskEditForm from "./TaskEditForm";
import TaskList from "./TaskList";

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
		newTasks[idx].user = users.find(
			(user) => user._id === newTasks[idx].assignee
		);
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
			{!isEditPage && <TaskCreateForm users={users} handleSave={handleSave} />}

			<br />
			<SmallButton onClick={handleSubmit}>PROCEED</SmallButton>
			<div>
				{isEditPage ? (
					<div>
						{tasks?.map((task, idx) => (
							<TaskEditForm
								key={task._id}
								task={task}
								eventId={eventId}
								users={users}
								handleUpdate={handleUpdate}
								handleChange={handleChange}
								idx={idx}
								handleDelete={handleDelete}
							/>
						))}
					</div>
				) : (
					<ul>
						{tasks.map((task) => (
							<TaskList key={task._id} task={task} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
