import { Link } from "react-router-dom";

export default function EventNavBar() {
	return (
		<nav className="eventnav">
			<Link to="/events/create">EVENT SETUP</Link>
			<br />
			<Link to="/events/:eventID/tasks/new">TASKS SETUP</Link>
		</nav>
	);
}
