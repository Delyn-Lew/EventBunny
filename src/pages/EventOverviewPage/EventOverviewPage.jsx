import { Outlet } from "react-router-dom";
import debug from "debug";
import { checkToken } from "../../utilities/users-service";

const log = debug("mern:pages:EventOverviewPage");

export default function EventOverviewPage() {
  const handleCheckToken = async () => {
    const expDate = await checkToken();
    log("expDate: %o", expDate);
  };
  return (
    <>
      {/* need to add in .css file for tailwind to work */}
      <button
        className="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-dark="true"
      >
        Create new event
      </button>
      <button onClick={handleCheckToken}>Check Login</button>
      <table className="events-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Details</th>
            <th></th>
          </tr>
        </thead>
      </table>
      <Outlet />
    </>
  );
}
