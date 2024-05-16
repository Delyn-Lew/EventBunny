import { Outlet } from "react-router-dom";
import debug from "debug";
import { checkToken } from "../../utilities/users-service";
import { useEffect, useState } from "react";
import { fetchEventsInfo } from "../../utilities/events-api";
import sendRequest from "../../utilities/send-request";

const log = debug("eventbunny:pages:EventOverviewPage");

export default function EventOverviewPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEventsInfo = async () => {
      try {
        const data = await fetchEventsInfo();
        setEvents(data);
      } catch (error) {
        console.log("error fetching events", error);
      }
    };
    getEventsInfo();
  });

  const handleJoinBtn = async (eventId) => {
    try {
      const updateEvent = await sendRequest(
        `/api/events/${eventId}/join`,
        "POST"
      );
      setEvents(
        events.map((event) =>
          event._id === updateEvent._id ? updateEvent : event
        )
      );
    } catch (error) {
      console.log("Error joining event", error);
    }
  };

  const handleCheckToken = async () => {
    const expDate = await checkToken();
    log("expDate: %o", expDate);
  };

  return (
    <>
      {/* need to add in .css file for tailwind to work */}
      <button onClick={handleCheckToken}>Check Login</button>
      <button
        className="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-dark="true"
      >
        Create new event
      </button>
      {events.length > 0 && (
        <table className="events-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Details</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>
                  <button
                    className="join-btn"
                    onClick={() => handleJoinBtn(event._id)}
                  >
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
