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
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-2 lg:px-0">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-200 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Event
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Details
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Host
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Join Event?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={event._id}
                        onClick={() => handleClickRow(event._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {event.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {event.description}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {event.location}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {new Date(event.date).toLocaleDateString()}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {new Date(event.date).toLocaleTimeString()}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {event.host?.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
                    ))}
                  </tbody>
                </table>
                <Outlet />
                <Link to="/events/create">
                  <Button type="button">Create new event</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
