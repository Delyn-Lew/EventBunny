import * as tasksAPI from "./tasks-api";

export const addEvent = async (task) => {
	return await tasksAPI.addTask(task);
};
