import axios from "axios";
import { useState } from "react";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        BASE_BACKEND_URL + `/reset-password/${token}`,
        { password },
        { withCredentials: true },
      );

      setMessage(response?.data?.messsage);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err?.response?.data || "Updating password has been failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl p-8 w-96">
        <h1 className="text-center text-xl tracking-wide font-bold mb-6">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
        bg-white border rounded-lg mb-4
        w-full p-3 focus:ring-2 focus:ring-blue-500
        "
        />

        {message && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {message}
          </div>
        )}
        <div className="flex  justify-center mt-2">
          <button onClick={handleResetPassword} className="btn btn-primary">
            {loading ? (
              <span className="loading loading-dots loading-lg text-white"></span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
