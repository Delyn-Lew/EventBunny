import EventNavBar from "../../components/EventNavBar/EventNavBar";

export default function TaskSetupPage() {
	const handleSave = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		console.log("data: %o", data);
	};

	return (
		<div>
			<br />
			<EventNavBar />
			<p>TASKSETUP</p>
			<form onSubmit={handleSave}>
				<label>Task Name</label>
				<input type="text" name="taskname" />
				<br />
				<label>Assignee</label>
				<input type="text" name="assignee" />
				<br />
				<button>SAVE</button>
			</form>
			<br />
			<button>SUBMIT EVENT</button>
		</div>
	);
}
