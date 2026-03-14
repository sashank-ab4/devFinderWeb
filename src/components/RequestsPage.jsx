import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

export default function Requests() {
  const requestUpdaterFunction = useDispatch();
  const myRequests = useSelector((store) => store.request);
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        BASE_BACKEND_URL + "/user/requests/received",
        {
          withCredentials: true,
        },
      );
      console.log(response?.data?.data);
      requestUpdaterFunction(addRequest(response?.data?.data)); // always res.data here orelse will redux will throw error
    } catch (err) {
      console.error("ERROR:" + err.message);
    }
  };
  const reviewRequests = async (status, _id) => {
    try {
      const response = await axios.post(
        BASE_BACKEND_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      requestUpdaterFunction(removeRequest(_id));
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!myRequests) return;

  return (
    <div className="min-h-screen bg-white p-6 ">
      <h1 className="text-xl font-semibold text-black mb-5  text-center">
        {myRequests.length === 0
          ? "You don't have any connection requests yet"
          : "Requests"}
      </h1>
      {myRequests > 0 && (
        <h3 className="text-lg font-mono text-black mb-6 text-center">
          Accept the Tribe, to Connect and Explore!
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myRequests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl } =
            request.senderUserId;

          return (
            <div
              key={_id}
              className="bg-[#ddedf5] rounded-2xl shadow-md p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <img
                  src={
                    photoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-300 mb-3"
                />
                <h2 className="text-xl font-semibold text-black">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <p className="text-black text-sm mt-1">
                    {age} • {gender}
                  </p>
                )}

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {about}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => reviewRequests("rejected", request._id)}
                  className="
                flex-1
                border border-blue-400
                text-blue-400
                py-2
                rounded-lg
                text-sm
                transition
                hover:bg-blue-50
                cursor-pointer
              "
                >
                  Reject
                </button>

                <button
                  onClick={() => reviewRequests("accepted", request._id)}
                  className="
                flex-1
                bg-blue-500
                text-white
                py-2
                rounded-lg
                text-sm
                transition
                hover:bg-blue-600
                cursor-pointer
              "
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
