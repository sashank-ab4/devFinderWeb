import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_BACKEND_URL } from "../utils/mockData";

export default function Login() {
  const [emailId, setEmailId] = useState("sashankab@gmail.com");
  const [password, setPassword] = useState("Sashank@0404");
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
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title tracking-wider">devFinder</h2>
          <p>Please login to Connect</p>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-start ">Email</legend>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <legend className="fieldset-legend ">Password</legend>
            <input
              type="text"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-end mt-5">
            <button className="btn btn-primary" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
