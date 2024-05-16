import debug from "debug";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import EventOverviewPage from "../EventOverviewPage/EventOverviewPage";
import EventSetupPage from "../EventSetupPage/EventSetupPage";
import TaskSetupPage from "../TaskSetupPage/TaskSetupPage";

const log = debug("eventbunny:pages:App:App");

function App() {
  const [user, setUser] = useState(getUser());
  // const [eventID, setEventID] = useState([]); // need to pass in getEvents for state
  const [tasks, setTasks] = useState([]); // need to pass in getTasks for state
  console.log(user?.["_id"]);
  log("user %o", user);

  if (!user) {
    return (
      <main className="App">
        <AuthPage setUser={setUser} />
      </main>
    );
  }

  return (
    <main className="App">
      <NavBar setUser={setUser} />
      <Link to="/events/create">Create new event</Link>
      <Routes>
        <Route path="/user" element={<EventOverviewPage />} />
        <Route
          path="/events/create"
          element={<EventSetupPage userID={user["_id"]} />}
        />
        <Route
          path="/events/:eventId/tasks/new"
          element={<TaskSetupPage setTasks={setTasks} tasks={tasks} />}
        />
      </Routes>
    </main>
  );
}

export default App;
