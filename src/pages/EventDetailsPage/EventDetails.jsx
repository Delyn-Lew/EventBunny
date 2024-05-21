import Button from "../../components/Button/Button";

function EventDetails({ event, user, admin, navigate, eventId }) {
  return (
    <>
      <h1>{event.name}</h1>
      <section>
        {event.host?._id === user?._id || admin ? (
          <Button
            onClick={() => {
              navigate(`/events/edit/${eventId}`);
            }}
          >
            Edit Event
          </Button>
        ) : (
          <p className="text-s text-red-500">
            This is not your event to Edit, look for {event.host?.name}
          </p>
        )}
        <p>Host: {event.host?.name}</p>
        <p>Description: {event.description}</p>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <p>Time: {new Date(event.date).toLocaleTimeString().slice(0, 5)}</p>
        <p>Location: {event.location}</p>
      </section>
    </>
  );
}

export default EventDetails;
