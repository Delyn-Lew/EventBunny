import Button from "../../components/Button/Button";

function EventDetails({ event, user, admin, navigate, eventId }) {
	return (
		<div className="flex justify-center">
			<section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
				<h1 className="text-center">{event.name}</h1>
				<span>
					<p>Host: {event.host?.name}</p>
					<p>Description: {event.description}</p>
					<p>Date: {new Date(event.date).toLocaleDateString()}</p>
					<p>
						Time:{" "}
						{new Date(event.date).toLocaleTimeString(undefined, {
							hour: "numeric",
							minute: "numeric",
							timeZoneName: "short",
						})}
					</p>
					<p>Location: {event.location}</p>
				</span>
				{event.host?._id === user?._id || admin ? (
					<span className="w-1/2 flex justify-center">
						<Button
							onClick={() => {
								navigate(`/events/edit/${eventId}`);
							}}
						>
							Edit Event
						</Button>
					</span>
				) : (
					<p className="text-xs text-red-500">
						This is not your event to Edit, look for {event.host?.name}
					</p>
				)}
			</section>
		</div>
	);
}

export default EventDetails;
