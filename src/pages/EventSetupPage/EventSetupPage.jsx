import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../../utilities/events-api";
import debug from "debug";
const log = debug("eventbunny:pages:EventSetupPage");

export default function EventSetupPage({ userID }) {
	const navigate = useNavigate();

	const handleSave = async (event) => {
		//save event into db
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		log("data: %o", data);
		const eventData = { ...data, host: userID };
		const response = await addEvent(eventData); // from events-api.js
		const eventId = response._id;
		navigate(`/events/${eventId}/tasks/new`);
	};

	return (
		<div>
			<br />
			<EventNavBar />
			<p>EVENTSETUP</p>
			<form onSubmit={handleSave}>
				<label htmlFor='name'>Event Title</label>
				<input type='text' name='name' />
				<br />
				<label htmlFor='description'>Event Description</label>
				<input type='text' name='description' />
				<br />
				<label htmlFor='date'>Event Date/Time</label>
				<input type='text' name='date' />
				<br />
				<label htmlFor='location'>Event Location</label>
				<input type='text' name='location' />
				<br />
				<button type='submit'>SAVE</button>
			</form>
			<br />
		</div>
	);
}
