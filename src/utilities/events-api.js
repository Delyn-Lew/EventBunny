import sendRequest from "./send-request";

export function addEvent(eventData) {
	return sendRequest("/api/events/create", "POST", eventData);
}
