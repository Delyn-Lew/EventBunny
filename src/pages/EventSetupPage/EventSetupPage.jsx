import EventNavBar from "../../components/EventNavBar/EventNavBar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { addEvent, getEvent, updateEvent, deleteEvent } from "../../utilities/events-service";
import { useState, useEffect } from "react";
import { getUser } from "../../utilities/users-service";
import debug from "debug";
import Button from "../../components/Button/Button";
import SmallInput from "../../components/Input/SmallInput";
const log = debug("eventbunny:pages:EventSetupPage");

export default function EventSetupPage({ userID, setShowTimeout }) {
	const [disabled, setDisabled] = useState(true);
	const navigate = useNavigate();
	const { eventId } = useParams();
	const [event, setEvent] = useState("");
	const location = useLocation();
	const isEditPage = location.pathname.includes("/edit");
	const [error, setError] = useState({});

	const validate = (event) => {
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		const nameError = !data.name ? "Event title should not be empty" : "";
		const dateError = !data.date ? "Event date should not be empty" : "";
		const descError = !data.description ? "Event description should not be empty" : "";
		const locationError = !data.location ? "Event location should not be empty" : "";
		setError({ nameError, dateError, descError, locationError });
	};

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

	const handleSave = async (event) => {
		event.preventDefault();
		const user = getUser();
		if (!user) {
			log("user not logged in");
			setShowTimeout(true);
			return;
		}

		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		log("userID", userID);
		data.user = userID;
		log("data: %o", data);
		if (isEditPage) {
			await updateEvent(eventId, data);
			navigate(`/events/${eventId}/tasks/edit`);
		} else {
			const eventData = { ...data, host: userID };
			log("eventData: %o", eventData);
			const response = await addEvent(eventData);
			evtId = response._id;
			navigate(`/events/${evtId}/tasks/new`);
		}
	};

	const handleDelete = async (eventId) => {
		const user = getUser();
		if (!user) {
			log("user not logged in");
			setShowTimeout(true);
			return;
		}
		log("delete", userID);
		await deleteEvent(eventId, { userID });
		navigate(`/user`);
	};

	return (
		<div>
			<br />
			<span className='flex justify-center'>
				<EventNavBar eventId={evtId} disabled={disabled} setDisabled={setDisabled} />
			</span>
			<div className='flex justify-center flex-col items-center h-full w-full my-20'>
				<h2>Event Setup</h2>
				<form
					onSubmit={(event) => {
						validate(event);
						handleSave(event);
					}}
					className='w-2/3 flex justify-center flex-col items-center bg-white bg-opacity-80 p-5 rounded-lg drop-shadow-xl shadow-inner border-2 my-10'>
					<label htmlFor='name'>Event Title</label>
					<SmallInput type='text' name='name' id='name' value={event?.name || ""} onChange={(evt) => setEvent({ ...event, name: evt.target.value })} />
					<br />
					<label htmlFor='description'>Event Description</label>
					<SmallInput type='text' name='description' id='description' value={event?.description || ""} onChange={(evt) => setEvent({ ...event, description: evt.target.value })} />
					<br />
					<label htmlFor='date'>Event Date/Time</label>
					<SmallInput type='datetime-local' name='date' id='date' value={event?.date || ""} onChange={(evt) => setEvent({ ...event, date: evt.target.value })} />
					<br />
					<label htmlFor='location'>Event Location</label>
					<SmallInput type='text' name='location' id='location' value={event?.location || ""} onChange={(evt) => setEvent({ ...event, location: evt.target.value })} />
					{error.nameError && <p className='text-red-500'>{error.nameError}</p>}
					{error.dateError && <p className='text-red-500'>{error.dateError}</p>}
					{error.descError && <p className='text-red-500'>{error.descError}</p>}
					{error.locationError && <p className='text-red-500'>{error.locationError}</p>}
					<br />
					<span className='flex justify-center gap-10'>
						{eventId ? <Button type='submit'>UPDATE</Button> : <Button type='submit'>SAVE</Button>}
						<Button onClick={() => handleDelete(eventId)} type='button' disabled={disabled}>
							DELETE EVENT
						</Button>
					</span>
				</form>
			</div>
			<br />
		</div>
	);
}
