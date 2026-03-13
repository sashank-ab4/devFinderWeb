import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_BACKEND_URL } from "../utils/mockData";

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSigninForm, setIsSigninForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginClick = async () => {
    try {
      const res = await axios.post(
        BASE_BACKEND_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      //console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Please check your email or password!");
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
    <div>
      <div className="flex items-center justify-center h-full relative z-10 mt-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-[#e5e7e8] bg-opacity-75 p-10 rounded-md w-100 flex flex-col space-y-5"
        >
          <h1 className="text-3xl font-bold text-center tracking-wider">
            devTribe
          </h1>
          {isSigninForm && (
            <p
              onClick={() => setIsSigninForm((value) => !value)}
              className="text-center text-2xl font-semibold "
            >
              First time here ?{" "}
              <a href="/" className="text-blue-500 hover:underline">
                Sign Up
              </a>
              .
            </p>
          )}

          <h2 className="text-center text-xl  tracking-wide text-blue-400">
            {isSigninForm ? "Create a new account" : "Log in to your account"}
          </h2>

          {isSigninForm && (
            <>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="number"
                placeholder="First Name"
                className="p-3 rounded-md bg-white text-black placeholder-gray-00 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
                className="p-3 rounded-md bg-white text-black placeholder-gray-00 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
                placeholder="Phone Number"
                className="p-3 rounded-md bg-white text-black placeholder-gray-00 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          <input
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            type="text"
            placeholder="Email"
            className="p-3 rounded-md bg-white text-black placeholder-gray-00 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* <p className=" text-blue-500 text-lg py-2 font-bold text-center">
            or
          </p> */}
          <button
            onClick={isSigninForm ? handleSignIn : handleLoginClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 cursor-pointer rounded-md font-semibold mt-2"
          >
            {isSigninForm ? "Sign in" : "Login"}
          </button>
          <p className="text-red-500 tracking-wide text-sm">{error}</p>

          {/* <p className="text-center text-gray-400">OR</p>

          <button className="bg-gray-600 hover:bg-gray-500 py-3 rounded-md font-semibold">
            Use a sign-in code
          </button> */}

          <p className="text-md text-gray-400 text-center mt-2">
            <p
              onClick={() => setIsSigninForm((value) => !value)}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              {isSigninForm
                ? `Already an User ? Login now`
                : `New to devTribe? Sign In now`}
            </p>
          </p>

          <p className="text-xs text-gray-500 mt-4 leading-5">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Learn more
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
