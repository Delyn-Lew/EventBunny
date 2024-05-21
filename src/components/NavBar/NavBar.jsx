import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";
import Button from "../Button/Button";

export default function NavBar({ setUser, user }) {
	const handleLogOut = () => {
		logOut();
		setUser(null);
	};

	return (
		<header className="flex flex-wrap justify-between sm:justify-start sm:flex-nowrap w-full bg-white bg-opacity-75 text-sm py-4 mb-5 drop-shadow-xl shadow-xl">
			<nav
				className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
				aria-label="Global"
			>
				<NavLink to="/dashboard">
					<img src="Untitled-1.png" className="h-10" alt="logo" />
				</NavLink>
				<NavLink to="/dashboard">
					<Button type="button">Home</Button>
				</NavLink>
				<hr className="rotate-0 h-5 m-0 p-0 opacity-30 " />
				<NavLink to="/user">
					<Button type="button">My Event</Button>
				</NavLink>
				<hr className="rotate-0 h-5 m-0 p-0 opacity-30" />
				<Link to="" onClick={handleLogOut}>
					<Button type="button">Log Out</Button>
				</Link>
				<p>Welcome {user.name}</p>
			</nav>
		</header>
	);
}
