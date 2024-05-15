import EventNavBar from "../../components/EventNavBar/EventNavBar";

export default function EventSetupPage() {
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
			<p>EVENTSETUP</p>
			<form onSubmit={handleSave}>
				<label>Event Title</label>
				<input type="text" name="title" />
				<br />
				<label>Event Description</label>
				<input type="text" name="description" />
				<br />
				<label>Event Date/Time</label>
				<input type="text" name="datetime" />
				<br />
				<label>Event Location</label>
				<input type="text" name="location" />
				<br />
				<button type="submit">SAVE</button>
			</form>
			<br />
		</div>
	);
}
