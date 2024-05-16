import sendRequest from "./send-request";

export function addEvent(eventData) {
	return sendRequest("/api/events", "POST", eventData);
}

export function getEvent(eventId) {
	return sendRequest(`/api/events/${eventId}`, "GET");
}
