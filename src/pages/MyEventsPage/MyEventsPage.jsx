import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { fetchUserEventsInfo } from "../../utilities/events-service";
import debug from "debug";
const log = debug("eventbunny:pages:MyEventsPage");

export default function MyEventsPage() {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const getEvents = async () => {
      if (!user || isFetched) return;

      try {
        log("Fetching events for user:", user._id);
        const events = await fetchUserEventsInfo(user._id);
        log("Fetched events:", events);
        setHostedEvents(events.eventsHosted);
        setAttendingEvents(events.eventsAttending);
        setIsFetched(true);
      } catch (error) {
        log("Error fetching user events", error);
      }
    };
    getEvents();
  }, [user, isFetched]);

  const handleClickEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div>
      <h2 className="text-center">Hosted Events</h2>
      {hostedEvents.length > 0 ? (
        <ul className="text-center">
          {hostedEvents.map((event) => (
            <li
              key={event._id}
              onClick={() => handleClickEvent(event._id)}
              style={{ cursor: "pointer" }}
            >
              {event.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hosted events found.</p>
      )}

      <h2 className="text-center">Attending Events</h2>
      {attendingEvents.length > 0 ? (
        <ul className="text-center">
          {attendingEvents.map((event) => (
            <li
              key={event._id}
              onClick={() => handleClickEvent(event._id)}
              style={{ cursor: "pointer" }}
            >
              {event.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No attending events found.</p>
      )}
    </div>
  );
}
