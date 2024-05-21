import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../../utilities/events-api";
import { getTasks } from "../../utilities/tasks-api";
import { getUser } from "../../utilities/users-service";
import debug from "debug";
import Button from "../../components/Button/Button";

const log = debug("eventbunny:pages:EventDetailsPage");

export default function EventDetailsPage({ admin }) {
  const [event, setEvent] = useState({});
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const { eventId } = useParams();
  const user = getUser();
  log("user_id", user?._id);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvent() {
      const event = await getEvent(eventId);
      setEvent(event);
    }
    fetchEvent();
    async function fetchTasks() {
      const tasks = await getTasks(eventId);
      setTasks(tasks);
    }
    fetchTasks();
  }, [eventId]);

  const localDate = new Date(event.date).toLocaleString();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "incomplete") return task.status !== "completed";
    return true;
  });
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <section className="mb-6">
        {event.host?._id === user?._id || admin ? (
          <Button
            onClick={() => {
              navigate(`/events/edit/${eventId}`);
            }}
          >
            Edit Event
          </Button>
        ) : (
          <p className="text-red-500">
            This is not your event to Edit, look for {event.host?.name}
          </p>
        )}
        <p className="mt-2">{event.description}</p>
        <p className="mt-2">DATE: {localDate}</p>
        <p className="mt-2">LOCATION: {event.location}</p>
        <p className="mt-2">HOST: {event.host?.name}</p>
      </section>
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <section>
        {/* <ul>
          {tasks.map((task) => (
            <li key={task.name}>
              {task.name} - {task.assignee?.name} - {task.status}
            </li>
          ))}
        </ul> */}
        <div className="mb-4">
          <label htmlFor="task-filter" className="mr-2">
            Filter tasks:
          </label>
          <select
            id="task-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <ul className="list-none p-0">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="grid grid-cols-3 items-center p-4 mb-2 border rounded bg-gray-50"
            >
              <div className="font-bold">{task.name}</div>
              <div className="text-center">
                {task.assignee?.name || "Unassigned"}
              </div>
              <div
                className={`text-right ${task.status === "completed" ? "text-green-500" : "text-red-500"}`}
              >
                {task.status}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
