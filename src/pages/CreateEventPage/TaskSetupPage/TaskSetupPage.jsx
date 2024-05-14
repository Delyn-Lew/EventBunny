import { Link } from "react-router-dom";

export default function TaskSetupPage() {
	return (
		<div>
			<br />
			<Link to="/event/new">
				<button>EVENT SETUP</button>
			</Link>
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
			<br />
			<button>SUBMIT EVENT</button>
		</div>
	);
}
