import { NavLink } from "react-router-dom";
import "./styles.css";
import { useParams, useLocation } from "react-router-dom";
import Button from "../Button/Button";

export default function EventNavBar({ disabled }) {
  const { eventId } = useParams();
  const location = useLocation();
  const isEditPage = location.pathname.endsWith("/edit");

  return (
    <nav className="eventnav">
      <NavLink
        className={({ isActive }) => (isActive ? "active-link" : "")}
        to={eventId ? `/events/edit/${eventId}` : "/events/create"}
      >
        <Button type="button">{eventId ? "Edit Event" : "Create Event"}</Button>
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
        <Button disabled={disabled} type="button">
          {" "}
          {!isEditPage ? "Edit Tasks" : "Add Task"}
        </Button>
      </NavLink>
    </nav>
  );
}
