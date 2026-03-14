import { NavLink, Outlet, Link } from "react-router-dom";

export default function MenuLayout() {
  return (
    <div>
      <div className="flex justify-center mt-5">
        <ul className="flex gap-6 bg-gray-200 px-6 py-2 rounded-lg">
          <li>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : ""
              }
            >
              Feed
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/connections"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold hover:border hover:border-blue-400"
                  : ""
              }
            >
              Connections
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : ""
              }
            >
              Requests
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
