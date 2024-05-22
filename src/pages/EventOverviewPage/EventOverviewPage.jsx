import { Outlet, Link, useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { useEffect, useState } from "react";
import { fetchEventsInfo, joinEvent } from "../../utilities/events-service";
import debug from "debug";
import Button from "../../components/Button/Button";
import SmallButton from "../../components/Button/SmallButton";

const log = debug("eventbunny:pages:EventOverviewPage");

export default function EventOverviewPage({ setShowTimeout }) {
  const [events, setEvents] = useState([]);
  const [eventsAttending, setEventsAttending] = useState({});
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const getEventsInfo = async () => {
      try {
        const data = await fetchEventsInfo();
        log("Fetched event data: %o", data);
        setEvents(data);
      } catch (error) {
        log("error fetching events", error);
      }
    };
    getEventsInfo();
  }, []);

  const handleJoinBtn = async (eventId, e) => {
    e.stopPropagation();
    const currentUser = getUser();
    if (!currentUser) {
      setShowTimeout(true);
      return;
    }
    try {
      const userId = user._id;
      const updateEvent = await joinEvent(eventId, { userId });
      log("Updated event after join: %o", updateEvent);
      setEvents(
        events.map((event) =>
          event._id === updateEvent._id ? updateEvent : event
        )
      );
    } catch (error) {
      log("Error joining event", error);
    }
  };

  const handleClickRow = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  useEffect(() => {
    log("events", events);
    const tempEventsAttending = {};
    events.forEach((event) =>
      event.attendees.forEach((attendee) => {
        if (attendee._id === user._id) {
          tempEventsAttending[event.name] = true;
        } else {
          tempEventsAttending[event.name] = false;
        }
      })
    );
    setEventsAttending(tempEventsAttending);
    log("update called", tempEventsAttending);
  }, [events, user._id]);

  return (
    <>
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
                    {/* <button
                      className="join-btn"
                      onClick={(e) => handleJoinBtn(event._id, e)}
                      disabled={user._id === event.host._id}
                    >
                      {eventsAttending[event.name] ? "Leave" : "Join"}
                    </button> */}
                    <SmallButton
                      type="button"
                      className="join-btn"
                      onClick={(e) => handleJoinBtn(event._id, e)}
                      disabled={user._id === event.host._id}
                    >
                      {eventsAttending[event.name] ? "Leave" : "Join"}
                    </SmallButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Outlet />
      <Link to="/events/create">
        {/* <button
          className="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-dark="true"
        >
          Create new event
        </button> */}
        <Button type="button"> Create new event </Button>
      </Link>
    </>
  );
}
