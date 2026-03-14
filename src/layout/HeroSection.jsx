import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const userLoggedIn = useSelector((store) => store.user);
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">DevTribe</h1>
            <p className="py-6">Welcome to devTribe</p>
            <Link
              to={userLoggedIn ? "/feed" : "/login"}
              className="btn btn-primary"
            >
              {userLoggedIn ? "Explore Feed" : "Get Started"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
