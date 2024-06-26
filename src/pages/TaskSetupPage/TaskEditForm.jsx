import SmallInput from "../../components/Input/SmallInput";
import SmallButton from "../../components/Button/SmallButton";
import { useState, useEffect } from "react";
import { getTasks } from "../../utilities/tasks-service";
import { useParams } from "react-router-dom";
export default function TaskEditForm({
	task,
	setTasks,
	users,
	handleUpdate,
	handleChange,
	idx,
	handleDelete,
}) {
	const [error, setError] = useState({});
	const { eventId } = useParams();

	useEffect(() => {
		const fetchTasks = async () => {
			const tasks = await getTasks(eventId);
			setTasks(tasks);
		};
		fetchTasks();
	}, [eventId, setTasks]);

	const validate = (event) => {
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		const nameError = !data.name ? "Task name should not be empty" : "";
		setError({ nameError });
	};
	return (
		<form
			className=" flex justify-center bg-white bg-opacity-80 p-5 items-center gap-5 "
			onSubmit={(event) => {
				validate(event);
				handleUpdate(task._id, eventId, task);
			}}
			key={task._id}
		>
			{error.nameError && <p className="text-red-500">{error.nameError}</p>}

			<label htmlFor="name">Task Name</label>
			<SmallInput
				type="text"
				name="name"
				value={task.name}
				onChange={handleChange("name", idx)}
			/>
			{/* <label htmlFor="assignee">Assignee</label>
    <input
        list="assignees"
        name="assignee"
        id="assignee"
        value={task.assignee?.name || task.user?.name}
        onChange={handleChange("assignee", idx)}
    />
    <datalist id="assignees">
        {users?.map((user) => (
            <option label={user.name} value={user._id} key={user._id} />
        ))}
    </datalist> */}
			<label htmlFor="assignee">Assignee</label>
			<select
				className="border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-center rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-7 w-[10rem]"
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
				className="border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
			text-center rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-7 w-[10rem]"
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
	);
}
