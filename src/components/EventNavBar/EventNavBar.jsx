import { NavLink } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";

export default function EventNavBar({ disabled }) {
  const { eventId } = useParams();
  const isEditPage = window.location.pathname.endsWith("/edit"); //TODOuse hook here, useLocation

  return (
    <nav className="eventnav">
      <NavLink
        className={({ isActive }) => (isActive ? "active-link" : "")}
        to={eventId ? `/events/edit/${eventId}` : "/events/create"}
      >
        <button type="button">{eventId ? "Edit Event" : "Create Event"}</button>
      </NavLink>
      <br />
      <NavLink
        className={({ isActive }) => (isActive ? "active-link" : "")}
        to={
          !isEditPage
            ? `/events/${eventId}/tasks/edit`
            : `/events/${eventId}/tasks/new`
        }
      >
        <button disabled={disabled} type="button">
          {" "}
          {!isEditPage ? "Edit Tasks" : "Add Task"}
        </button>
      </NavLink>
    </nav>
  );
}
