import { getTasks } from "../../utilities/tasks-api";
import { useEffect, useState } from "react";

export default function EventTasks({ eventId }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasks(eventId);
      setTasks(tasks);
    }
    fetchTasks();
  }, [eventId]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "incomplete") return task.status !== "completed";
    return true;
  });
  return (
    <>
      {/* {tasks.map((task) => (
        <li key={task._id}>
          {task.name} - {task.assignee.name} - {task.status}
        </li>
      ))} */}
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
      <ul className="list-none p-0">
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className="grid grid-cols-3 items-center p-4 mb-2 border rounded bg-gray-50"
          >
            <div className="font-semibold">{task.name}</div>
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
    </>
  );
}
