import Button from "../../components/Button/Button";
import SmallInput from "../../components/Input/SmallInput";
import { useState } from "react";

export default function TaskCreateForm({ handleSave, users }) {
	const [error, setError] = useState({});

	const validate = (event) => {
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		const nameError = !data.name ? "Task name should not be empty" : "";
		setError({ nameError });
	};

	return (
		<form
			onSubmit={(event) => {
				validate(event);
				handleSave(event);
			}}
			className="w-2/3 flex justify-center flex-col items-center bg-white bg-opacity-80 p-5 rounded-lg drop-shadow-xl shadow-inner border-2 mt10"
		>
			<label htmlFor="name">Task Name</label>
			<SmallInput type="text" name="name" id="name" />
			<br />
			<label htmlFor="assignee">Assignee</label>
			<select
				className="border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex w-1/4
				text-center rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-7"
				name="assignee"
				id="assignee"
			>
				{users?.map((user) => (
					<option value={user._id} key={user._id}>
						{user.name}
					</option>
				))}
			</select>
			<br />
			<label htmlFor="status">Status</label>
			<select
				className="border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex w-1/4
				text-center rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-7"
				name="status"
				id="status"
			>
				<option value="incomplete">incomplete</option>
				<option value="completed">completed</option>
			</select>
			<br />
			{error.nameError && <p className="text-red-500">{error.nameError}</p>}
			<Button type="submit">SAVE</Button>
		</form>
	);
}
