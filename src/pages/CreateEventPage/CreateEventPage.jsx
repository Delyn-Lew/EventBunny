import EventSetupPage from "./EventSetupPage/EventSetupPage";
import TaskSetupPage from "./TaskSetupPage/TaskSetupPage";

export default function CreateEventPage() {
	return (
		<>
			<EventSetupPage />
			<TaskSetupPage />
			<br />
			<button>SUBMIT EVENT</button>
		</>
	);
}
