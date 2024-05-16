import * as tasksAPI from "./tasks-api";

export const addTask = async (task, eventId) => {
	return await tasksAPI.addTask(task, eventId);
};

export const getTasks = async (eventId) => {
	return await tasksAPI.getTasks(eventId);
};

export const updateTask = async (taskId, eventId, data) => {
	console.log(taskId, eventId, data);
	return await tasksAPI.updateTask(taskId, eventId, data);
};
