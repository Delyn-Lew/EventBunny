export default function TaskSetupPage() {
	return (
		<div>
			<p>TASKSETUP</p>
			<form>
				<label>Task Name</label>
				<input type="text" />
				<br />
				<label>Assignee</label>
				<input type="text" />
				<br />
				<button>SAVE</button>
			</form>
		</div>
	);
}
