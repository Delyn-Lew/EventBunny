import * as tasksAPI from "./tasks-api";

export const addTask = async (task) => {
	return await tasksAPI.addTask(task);
};

export const getTasks = async (eventId) => {
	return await tasksAPI.getTasks(eventId);
};
