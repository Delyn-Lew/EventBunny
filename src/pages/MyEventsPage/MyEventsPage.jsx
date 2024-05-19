import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { fetchUserEventsInfo } from "../../utilities/events-api";

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
        console.log("Fetching events for user:", user._id);
        const events = await fetchUserEventsInfo(user._id);
        console.log("Fetched events:", events);
        setHostedEvents(events.eventsHosted);
        setAttendingEvents(events.eventsAttending);
        setIsFetched(true);
      } catch (error) {
        console.error("Error fetching user events", error);
      }
    };
    getEvents();
  }, [user, isFetched]);

  const handleClickEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div>
      <h2>Hosted Events</h2>
      {hostedEvents.length > 0 ? (
        <ul>
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

      <h2>Attending Events</h2>
      {attendingEvents.length > 0 ? (
        <ul>
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
