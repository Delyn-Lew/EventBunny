import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../../utilities/events-api";
import { getUser } from "../../utilities/users-service";
import debug from "debug";
import EventTasks from "./EventTasks";
import EventDetails from "./EventDetails";
const log = debug("eventbunny:pages:EventDetailsPage");

export default function EventDetailsPage({ admin }) {
  const [event, setEvent] = useState({});
  const { eventId } = useParams();
  const user = getUser();
  log("user_id", user?._id);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvent() {
      const event = await getEvent(eventId);
      setEvent(event);
    }
    fetchEvent();
  }, [eventId]);

  return (
    <>
      <EventDetails
        event={event}
        user={user}
        admin={admin}
        navigate={navigate}
        eventId={eventId}
      />
      <h2>Tasks</h2>
      <section>
        <EventTasks eventId={eventId} />
      </section>
    </>
  );
}
