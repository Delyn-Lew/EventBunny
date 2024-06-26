import * as eventsAPI from "./events-api";

export const addEvent = async (eventData) => {
	return await eventsAPI.addEvent(eventData);
};

export const fetchEventsInfo = async () => {
	return await eventsAPI.fetchEventsInfo();
};

export const fetchUserEventsInfo = async (userId) => {
	return await eventsAPI.fetchUserEventsInfo(userId);
};

export const joinEvent = async (eventId, userId) => {
	return await eventsAPI.joinEvent(eventId, userId);
};

export const getEvent = async (eventId) => {
	return await eventsAPI.getEvent(eventId);
};

export const updateEvent = async (eventId, eventData) => {
	return await eventsAPI.updateEvent(eventId, eventData);
};

export const deleteEvent = async (eventId, userId) => {
	return await eventsAPI.deleteEvent(eventId, userId);
};
