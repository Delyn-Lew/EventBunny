import * as tasksAPI from "./tasks-api";

export const addTask = async (task) => {
	return await tasksAPI.addTask(task);
};

export const getTasks = async () => {
	return await tasksAPI.getTasks();
};
