import sendRequest from "./send-request";

export function addTask(task, eventId) {
	return sendRequest(`/api/events/${eventId}/tasks`, "POST", task);
}
