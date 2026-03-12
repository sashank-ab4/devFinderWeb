import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { removeUser } from "../utils/userSlice";
import { GoPerson } from "react-icons/go";

export default function Navbar() {
  //this down here is subscribing to the store
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  // again updating the store doing the action of removing the user!
  const updaterFunction = useDispatch();
  const handleLoginButton = () => {
    navigate("/login");
  };
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_BACKEND_URL + "/logout",
        {}, // empty here coz we're not sending any data here, same as here, in backend we wrote null
        { withCredentials: true },
      );
      updaterFunction(removeUser());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          devFinder
        </Link>
      </div>
      {user ? (
        <div className="flex gap-2 items-center">
          <div>Hey, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-6">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="tracking-wider">
          <button className="btn btn-ghost" onClick={handleLoginButton}>
            <GoPerson size={20} /> LOGIN
          </button>
        </div>
      )}
    </div>
  );
}
