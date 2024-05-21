import SmallInput from "../../components/Input/SmallInput";

export default function TaskCreateForm({ handleSave, users }) {
	return (
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
			<p style={{ color: "slategray", fontSize: "10px", lineHeight: "0px" }}>
				(check the box if completed)
			</p>

			<button type="submit">SAVE</button>
		</form>
	);
}
