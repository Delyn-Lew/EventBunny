import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useState } from "react";

export default function AuthPage({ setUser }) {
	const [showSignUp, setShowSignUp] = useState(false);

	const navigateToSignUp = () => {
		setShowSignUp(true);
	};

	return (
		<>
			{!showSignUp ? (
				<LoginForm setUser={setUser} onSignUp={navigateToSignUp} />
			) : (
				<SignUpForm setUser={setUser} />
			)}
		</>
	);
}
