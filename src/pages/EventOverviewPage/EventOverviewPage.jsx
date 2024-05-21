import { Outlet, Link, useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { useEffect, useState } from "react";
import { fetchEventsInfo } from "../../utilities/events-api";
import sendRequest from "../../utilities/send-request";
import debug from "debug";

const log = debug("eventbunny:pages:EventOverviewPage");

export default function EventOverviewPage({ setShowTimeout }) {
  const [events, setEvents] = useState([]);
  const [eventAttending, setEventAttending] = useState({});
  const navigate = useNavigate();
  const user = getUser();
  log("user %o:", user);

  useEffect(() => {
    const getEventsInfo = async () => {
      try {
        const data = await fetchEventsInfo();
        // log("Fetched event data: %o", data);
        setEvents(data);
      } catch (error) {
        // log("error fetching events", error);
      }
    };
    getEventsInfo();
  }, []);

  const handleJoinBtn = async (eventId, e) => {
    e.stopPropagation();

    const currentUser = getUser();
    // log("currentuser %o:", currentUser);
    if (!currentUser) {
      // log("user not logged in");
      setShowTimeout(true);
      return;
    }

    try {
      const userId = user._id;
      // log("User %o", user);
      // log(`Joining event with ID: ${eventId}`);

      if (
        user._id === events.find((event) => event._id === eventId)?.host?._id
      ) {
        // log("Host cannot join their own event");
        return;
      }

      const updateEvent = await sendRequest(
        `/api/events/${eventId}/join`,
        "POST",
        { userId }
      );
      // log("Updated event after join: %o", updateEvent);

      // setEvents((prevEvents) =>
      //   prevEvents.map((event) =>
      //     event._id === updateEvent._id ? updateEvent : event
      //   )
      // );
      setEvents(
        events.map((event) =>
          event._id === updateEvent._id ? updateEvent : event
        )
      );
      setEventAttending({
        ...eventAttending,
        [eventId]: !eventAttending[eventId],
      });
      //TODO solve this --> use state instead of localstorage, then to change true/false for each event during the mapping of join/leave button.
      // localStorage.setItem(
      //   `attendance-${eventId}`,
      //   JSON.stringify(updateEvent.attendees.includes(userId))
      // );
      // log("Event joined successfully");
    } catch (error) {
      // log("Error joining event", error);
    }
  };

  const handleClickRow = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const isUserAttending = (event) => {
    // check if user is attending
    const attendeeIds = [];
    console.log(`event attendees: ${JSON.stringify(event.attendees)}`);
    event.attendees.map((attendee) => attendeeIds.push(attendee._id));
    return attendeeIds.includes(user._id);
  };

  useEffect(() => {
    // log("Events state on render: %o", events);
  }, [events]);

  return (
    <>
      <Link to="/events/create">
        <button
          className="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-dark="true"
        >
          Create new event
        </button>
      </Link>
      {events.length > 0 && (
        <table className="events-table">
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
            {events.map((event) => {
              const isAttending = isUserAttending(event);
              console.log(event.name);
              console.log(`user attending? ${isAttending}`);

              // log("Rendering event: %o, isAttending: %o", event, isAttending);
              return (
                <tr
                  key={event._id}
                  onClick={() => handleClickRow(event._id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{new Date(event.date).toLocaleTimeString()}</td>
                  <td>{event.host?.name}</td>
                  <td>
                    <button
                      className="join-btn"
                      onClick={(e) => handleJoinBtn(event._id, e)}
                      disabled={
                        user && event.host && user._id === event.host._id
                      }
                    >
                      {isAttending || eventAttending[event._id]
                        ? "Leave"
                        : "Join"}
                      {/* {isAttending ||
                      localStorage.getItem(`attendance-${event._id}`) === "true"
                        ? "Leave"
                        : "Join"} */}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Outlet />
    </>
  );
}
