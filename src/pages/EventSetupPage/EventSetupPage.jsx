import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { useNavigate, useParams } from "react-router-dom";
import {
	addEvent,
	getEvent,
	updateEvent,
} from "../../utilities/events-service";
import { useState, useEffect } from "react";
import debug from "debug";
const log = debug("eventbunny:pages:EventSetupPage");

export default function EventSetupPage({ userID }) {
	const [disabled, setDisabled] = useState(true);
	const navigate = useNavigate();
	const { eventId } = useParams();
	const [event, setEvent] = useState("");
	const isEditPage = window.location.pathname.includes("/edit");

	let evtId = "";

	useEffect(() => {
		async function fetchEventDetails() {
			isEditPage && setDisabled(false);
			if (eventId) {
				const data = await getEvent(eventId);
				data.date = new Date(data.date).toISOString().slice(0, 16);
				setEvent(data);
			}
		}
		fetchEventDetails();
	}, [eventId, isEditPage]);

	console.log(event);

	const handleSave = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		log("data: %o", data);
		if (isEditPage) {
			await updateEvent(eventId, data);
			navigate(`/events/${eventId}/tasks/edit`);
		} else {
			const eventData = { ...data, host: userID };
			const response = await addEvent(eventData);
			evtId = response._id;
			navigate(`/events/${evtId}/tasks/new`);
		}
	};

	return (
		<div>
			<br />
			<EventNavBar
				eventId={evtId}
				disabled={disabled}
				setDisabled={setDisabled}
			/>
			<p>EVENTSETUP</p>
			<form onSubmit={handleSave}>
				<label htmlFor="name">Event Title</label>
				<input
					type="text"
					name="name"
					id="name"
					value={event?.name || ""}
					onChange={(evt) => setEvent({ ...event, name: evt.target.value })}
				/>
				<br />
				<label htmlFor="description">Event Description</label>
				<input
					type="text"
					name="description"
					id="description"
					value={event?.description || ""}
					onChange={(evt) =>
						setEvent({ ...event, description: evt.target.value })
					}
				/>
				<br />
				<label htmlFor="date">Event Date/Time</label>
				<input
					type="datetime-local"
					name="date"
					id="date"
					value={event?.date || ""}
					onChange={(evt) => setEvent({ ...event, date: evt.target.value })}
				/>
				<br />
				<label htmlFor="location">Event Location</label>
				<input
					type="text"
					name="location"
					id="location"
					value={event?.location || ""}
					onChange={(evt) => setEvent({ ...event, location: evt.target.value })}
				/>
				<br />
				{eventId ? (
					<button type="submit">UPDATE</button>
				) : (
					<button type="submit">SAVE</button>
				)}
			</form>
			<br />
		</div>
	);
}
