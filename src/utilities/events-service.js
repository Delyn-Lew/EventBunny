import * as eventsAPI from "./events-api";

export const addEvent = async (eventData) => {
  return await eventsAPI.addEvent(eventData);
};

export const fetchEventsInfo = async () => {
  return await eventsAPI.fetchEventsInfo();
};
