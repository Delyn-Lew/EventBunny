import { Link } from "react-router-dom";

export default function EventSetupPage() {
	return (
		<div>
			<br />
			<Link to="/event/:eventID/task/new">
				<button>TASKS SETUP</button>
			</Link>
			<p>EVENTSETUP</p>
			<form>
				<label>Event Title</label>
				<input type="text" />
				<br />
				<label>Event Description</label>
				<input type="text" />
				<br />
				<label>Event Date/Time</label>
				<input type="text" />
				<br />
				<label>Event Location</label>
				<input type="text" />
				<br />
				<button>SAVE</button>
			</form>
			<br />
			{/* <button>SUBMIT EVENT</button> */}
		</div>
	);
}
