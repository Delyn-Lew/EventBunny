import * as eventsAPI from "./events-api";

export const addEvent = async (eventData) => {
  return await eventsAPI.addEvent(eventData);
};

export const fetchEventsInfo = async () => {
  return await eventsAPI.fetchEventsInfo();
};

export const getEvent = async (eventId) => {
  return await eventsAPI.getEvent(eventId);
};

export const updateEvent = async (eventId, eventData) => {
  return await eventsAPI.updateEvent(eventId, eventData);
};

export const fetchHostingEvents = async () => {
  return await eventsAPI.fetchHostedEvents();
};

export const fetchAttendingEvents = async () => {
  return await eventsAPI.fetchAttendingEvents();
};

export const deleteEvent = async (eventId) => {
	return await eventsAPI.deleteEvent(eventId);
};
