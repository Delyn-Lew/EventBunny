import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import debug from "debug";
const log = debug("eventbunny:components:UserTimeout");

const UserTimeout = ({ setUser, children, setShowTimeout }) => {
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(3);
	const user = getUser();

	useEffect(() => {
		log("user %o:", user);
		if (!user) {
			const timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
			const timeout = setTimeout(() => {
				setUser(null); // clear user state before navigating.
				setShowTimeout(false); // reset timeout state
				navigate("/");
			}, 3000);

			//clear timers on component unmount / user change
			return () => {
				clearInterval(timer);
				clearTimeout(timeout);
			};
		}
	}, [user, navigate, setUser, setShowTimeout]);

	if (!user) {
		return (
			<div>
				<h2>You are not logged in</h2>
				<h3>redirecting to login page in {countdown} seconds...</h3>
			</div>
		);
	}
	return children;
};
export default UserTimeout;
