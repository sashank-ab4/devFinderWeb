import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
/* import heroBg from "../assets/heroBg.jpg"; */
import { HERO_SEC_IMG } from "../utils/mockData";

export default function HeroSection() {
  const userLoggedIn = useSelector((store) => store.user);
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${HERO_SEC_IMG})` }}
    >
      {/* Overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl font-bold text-blue-600 tracking-wide">
          DevTribe
        </h1>

        <p className="mt-6 text-lg text-[#050531] max-w-md mx-auto">
          Discover developers, build connections, and collaborate on amazing
          projects.
        </p>

        <Link
          to={userLoggedIn ? "/feed" : "/login"}
          className="inline-block mt-8 bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          {userLoggedIn ? "Explore Feed" : "Get Started"}
        </Link>
      </div>
    </div>
  );
}
