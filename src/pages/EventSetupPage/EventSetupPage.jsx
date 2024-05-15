import EventNavBar from "../../components/EventNavBar/EventNavBar";

export default function EventSetupPage() {
	const handleSave = async (event) => {
		//save event into db
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
				<label htmlFor="name">Event Title</label>
				<input type="text" name="name" />
				<br />
				<label htmlFor="description">Event Description</label>
				<input type="text" name="description" />
				<br />
				<label htmlFor="date">Event Date/Time</label>
				<input type="text" name="date" />
				<br />
				<label htmlFor="location">Event Location</label>
				<input type="text" name="location" />
				<br />
				<button type="submit">SAVE</button>
			</form>
			<br />
		</div>
	);
}
