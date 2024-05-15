import { NavLink } from "react-router-dom";
import "./styles.css";

export default function EventNavBar() {
	return (
		<nav className="eventnav">
			<NavLink
				className={({ isActive }) => (isActive ? "active-link" : "")}
				to="/events"
			>
				EVENT SETUP
			</NavLink>
			<br />
			<NavLink
				className={({ isActive }) => (isActive ? "active-link" : "")}
				to="/events/tasks/new"
			>
				TASKS SETUP
			</NavLink>
		</nav>
	);
}
