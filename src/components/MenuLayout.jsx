import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

export default function MenuLayout() {
  const myRequests = useSelector((store) => store.request);
  return (
    <div>
      <div className="flex justify-center mt-5">
        <ul className="flex gap-6 bg-gray-200 px-4 py-2 rounded-xl w-fit mx-auto">
          <li>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300 ease-in-out
      ${
        isActive
          ? "bg-blue-200 text-blue-600 font-semibold shadow-sm scale-105"
          : "text-gray-600 hover:text-blue-500"
      }`
              }
            >
              Feed
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/connections"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300 ease-in-out
      ${
        isActive
          ? "bg-blue-200 text-blue-600 font-semibold shadow-sm scale-105"
          : "text-gray-600 hover:text-blue-500 "
      }`
              }
            >
              Connections
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300 ease-in-out
      ${
        isActive
          ? "bg-blue-200 text-blue-600 font-semibold shadow-sm scale-105"
          : "text-gray-600 hover:text-blue-500 "
      }`
              }
            >
              Requests{" "}
              <div className="badge badge-sm badge-primary rounded-full">
                {myRequests.length}
              </div>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
