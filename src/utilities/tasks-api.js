import sendRequest from "./send-request";

export function addTask(task, eventId) {
	console.log(task, eventId);
	return sendRequest(`/api/events/${eventId}/tasks`, "POST", task);
}

export function getTasks(eventId) {
	return sendRequest(`/api/events/${eventId}/tasks`, "GET");
}

export function updateTask(taskId, eventId, data) {
	console.log(taskId, eventId, data);
	return sendRequest(`/api/events/${eventId}/tasks/${taskId}`, "PUT", data);
}
