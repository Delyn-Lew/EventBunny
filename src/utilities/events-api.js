import sendRequest from "./send-request";

const EVENTS_URL = "/api/events";

export function addEvent(eventData) {
	return sendRequest(EVENTS_URL, "POST", eventData);
}

export function fetchEventsInfo() {
	return sendRequest(EVENTS_URL, "GET");
}

export function getEvent(eventId) {
	return sendRequest(`${EVENTS_URL}/${eventId}`, "GET");
}

export function updateEvent(eventId, eventData) {
	return sendRequest(`${EVENTS_URL}/${eventId}`, "PUT", eventData);
}
