import { Outlet } from "react-router-dom";
import debug from "debug";
import { checkToken } from "../../utilities/users-service";

const log = debug("eventbunny:pages:OrderHistoryPage");

export default function OrderHistoryPage() {
	const handleCheckToken = async () => {
		const expDate = await checkToken();
		log("expDate: %o", expDate);
	};
	return (
		<>
			<p>OrderHistoryPage</p>
			<button onClick={handleCheckToken}>Check Login</button>
			<Outlet />
		</>
	);
}
