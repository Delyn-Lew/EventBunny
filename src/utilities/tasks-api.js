import sendRequest from "./send-request";

export function addTask(taskArray) {
	return sendRequest("/api/events/:eventID/tasks/new", "POST", taskArray);
}
