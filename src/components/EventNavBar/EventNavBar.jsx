import { NavLink } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";

export default function EventNavBar({ disabled }) {
	const { eventId } = useParams();

	return (
		<nav className="eventnav">
			<NavLink
				className={({ isActive }) => (isActive ? "active-link" : "")}
				to="/events/create"
			>
				<button type="button">EVENT SETUP</button>
			</NavLink>
			<br />
			<NavLink
				className={({ isActive }) => (isActive ? "active-link" : "")}
				to={`/events/${eventId}/tasks/new`}
			>
				<button disabled={disabled} type="button">
					TASKS SETUP
				</button>
			</NavLink>
		</nav>
	);
}
