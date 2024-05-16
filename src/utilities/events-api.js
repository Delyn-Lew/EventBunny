import sendRequest from "./send-request";

const EVENTS_URL = "/api/events";

export function addEvent(eventData) {
  return sendRequest("EVENTS_URL", "POST", eventData);
}

export function fetchEventsInfo() {
  return sendRequest(EVENTS_URL);
}
