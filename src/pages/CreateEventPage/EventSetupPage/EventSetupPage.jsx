export default function EventSetupPage() {
	return (
		<div>
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
		</div>
	);
}
