import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">DevTribe</h1>
            <p className="py-6">Welcome to devTribe</p>
            <Link to={"/login"} className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
