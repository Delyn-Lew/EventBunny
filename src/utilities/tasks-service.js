import * as tasksAPI from "./events-api";

export const addEvent = async (taskArray) => {
	return await tasksAPI.addEvent(taskArray);
};
