import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_BACKEND_URL } from "../utils/mockData";

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <div>
      <div className="flex items-center justify-center h-full relative z-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-[#e5e7e8] bg-opacity-75 p-10 rounded-md w-100 flex flex-col space-y-5"
        >
          <h1 className="text-3xl font-bold text-center">
            {/* {isSignInForm ? "Sign In" : "Sign Up"} */}
            devFinder
          </h1>
          <h2 className="text-center text-2xl -tracking-wider text-blue-400">
            Log in to your account
          </h2>
          <p className="text-center font-semibold ">
            Don't have an account ?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Sign Up
            </a>
            .
          </p>

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
            onClick={handleLoginClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 cursor-pointer rounded-md font-semibold mt-2"
          >
            Login
          </button>

          {/* <p className="text-center text-gray-400">OR</p>

          <button className="bg-gray-600 hover:bg-gray-500 py-3 rounded-md font-semibold">
            Use a sign-in code
          </button> */}

          <p className="text-sm text-gray-400 text-center mt-4">
            <p
              /* onClick={signUpToggle} */
              className="text-white hover:underline cursor-pointer"
            >
              {/* {isSignInForm
                ? "New to Netflix? Sign Up Now"
                : "Already an User ? Sign in Now"} */}
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
