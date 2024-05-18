import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

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
				<img src="public/Untitled-1.png" className="h-10" alt="logo" />
				<NavLink to="/dashboard">
					<button
						className="transition-all drop-shadow-lg bg-white border-2 border-transparent p-2 px-5 rounded-md hover:border-slate-300 hover:rounded-lg active:bg-slate-300 focus-visible:bg-slate-300 shadow-inner cursor-pointer text-center font-medium text-slate-700"
						type="button"
					>
						Home
					</button>
				</NavLink>
				<hr className="rotate-0 h-5 m-0 p-0 opacity-30 " />
				<NavLink to="/events/:userID">
					<button
						className="transition-all drop-shadow-lg bg-white border-2 border-transparent p-2 px-5 rounded-md hover:border-slate-300 hover:rounded-lg active:bg-slate-300 focus-visible:bg-slate-300 shadow-inner cursor-pointer text-center font-medium text-slate-700"
						type="button"
					>
						My Event
					</button>
				</NavLink>
				<hr className="rotate-0 h-5 m-0 p-0 opacity-30" />
				<Link to="" onClick={handleLogOut}>
					<button
						className="transition-all drop-shadow-lg bg-white border-2 border-transparent p-2 px-5 rounded-md hover:border-slate-300 hover:rounded-lg active:bg-slate-300 focus-visible:bg-slate-300 shadow-inner cursor-pointer text-center font-medium text-slate-700"
						type="button"
					>
						Log Out
					</button>
				</Link>
				<p>Welcome {user.name}</p>
			</nav>
		</header>
	);
}
