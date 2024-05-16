import * as eventsAPI from "./events-api";

export const addEvent = async (eventData) => {
	return await eventsAPI.addEvent(eventData);
};

export const getEvent = async (eventId) => {
	return await eventsAPI.getEvent(eventId);
};
