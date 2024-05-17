import { Outlet, Link, useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { useEffect, useState } from "react";
import { fetchEventsInfo } from "../../utilities/events-api";
import sendRequest from "../../utilities/send-request";
import debug from "debug";
const log = debug("eventbunny:pages:EventOverviewPage");

export default function EventOverviewPage({ setUser }) {
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getEventsInfo = async () => {
			try {
				const data = await fetchEventsInfo();
				setEvents(data);
			} catch (error) {
				log("error fetching events", error);
			}
		};
		getEventsInfo();
	}, []);

	const handleJoinBtn = async (eventId, e) => {
		e.stopPropagation();
		const user = getUser();
		if (!user) {
			log("user not logged in");
			navigate("/");
			setUser(null);
			return;
		}

		try {
			const userId = user._id;
			log("user %o:", user);
			log(`Joining event with ID: ${eventId}`);
			const updateEvent = await sendRequest(`/api/events/${eventId}/join`, "POST", { userId });
			setEvents(events.map((event) => (event._id === updateEvent._id ? updateEvent : event)));
			log("success");
		} catch (error) {
			log("Error joining event", error);
		}
	};
	const handleClickRow = (eventId) => {
		navigate(`/events/${eventId}`);
	};

	return (
		<>
			<Link to='/events/create'>
				<button
					className='middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
					data-ripple-dark='true'>
					Create new event
				</button>
			</Link>
			{events.length > 0 && (
				<table className='events-table'>
					<thead>
						<tr>
							<th>Event</th>
							<th>Details</th>
							<th>Location</th>
							<th>Date</th>
							<th>Time</th>
							<th>Host</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{events.map((event) => (
							<tr key={event._id} onClick={() => handleClickRow(event._id)}>
								<td>{event.name}</td>
								<td>{event.description}</td>
								<td>{event.location}</td>
								<td>{new Date(event.date).toLocaleDateString()}</td>
								<td>{new Date(event.date).toLocaleTimeString()}</td>
								<td>{event.host.name}</td>
								<td>
									<button className='join-btn' onClick={(e) => handleJoinBtn(event._id, e)}>
										Join
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<Outlet />
		</>
	);
}
