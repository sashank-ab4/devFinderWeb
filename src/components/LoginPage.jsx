import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_BACKEND_URL, LOGIN_PAGE_IMG } from "../utils/mockData";

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSigninForm, setIsSigninForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_BACKEND_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Please check your email or password!");
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        BASE_BACKEND_URL + "/signup",
        { firstName, lastName, emailId, password, phoneNumber },
        { withCredentials: true },
      );
      console.log(response);
      dispatch(addUser(response?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.message?.message) || "Please check again!";
    }
  };
  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: `url(${LOGIN_PAGE_IMG})` }}
    >
      <div className="flex items-center justify-center mt-12">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white p-10 rounded-xl w-105 flex flex-col space-y-5 shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center tracking-wide">
            DevTribe
          </h1>

          <p className="text-center text-gray-500">
            {isSigninForm ? "Already have an account?" : "New to devTribe?"}
            <span
              onClick={() => setIsSigninForm((prev) => !prev)}
              className="text-blue-500 hover:underline ml-2 cursor-pointer"
            >
              {isSigninForm ? "Login" : "Sign Up"}
            </span>
          </p>

          <h2 className="text-center text-xl text-blue-500 font-semibold">
            {isSigninForm ? "Create your account" : "Login to your account"}
          </h2>

          {isSigninForm && (
            <>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
                className="p-3 rounded-md bg-white border focus:ring-2 focus:ring-blue-400"
              />

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
                className="p-3 rounded-md bg-white border focus:ring-2 focus:ring-blue-400"
              />

              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
                placeholder="Phone Number"
                className="p-3 rounded-md bg-white border focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          <input
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-3 rounded-md bg-white border focus:ring-2 focus:ring-blue-400"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 rounded-md bg-white border focus:ring-2 focus:ring-blue-400"
          />
          <button
            disabled={loading}
            onClick={isSigninForm ? handleSignIn : handleLogin}
            className=" btn btn-lg bg-blue-500 tracking-wide text-white hover:bg-blue-600"
          >
            {loading ? (
              <span className="loading loading-spinner loading-secondary"></span>
            ) : isSigninForm ? (
              "Sign in"
            ) : (
              "Login"
            )}
          </button>

          {error && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{error}</span>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center leading-5">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a href="/" className="text-blue-500 hover:underline ml-1">
              Learn more
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
