import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserTimeout = ({ user, setUser, children }) => {
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(3);
	useEffect(() => {
		if (!user) {
			const timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
			const timeout = setTimeout(() => {
				setUser(null); // need to set this before navigating.
				navigate("/");
			}, 3000);

			return () => {
				clearInterval(timer);
				clearTimeout(timeout);
			};
		}
	}, [user, navigate, setUser]);

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
