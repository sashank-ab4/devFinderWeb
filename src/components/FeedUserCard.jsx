import { BASE_BACKEND_URL } from "../utils/mockData";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeProfileFromFeed } from "../utils/feedSlice";

export default function FeedUserCard({ user }) {
  const { _id, firstName, lastName, age, about, gender } = user;
  const dispatch = useDispatch();
  const handleRequestsFromFeed = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_BACKEND_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );

      dispatch(removeProfileFromFeed(_id));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
      <div className="h-60 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={
            user.photoUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-6 text-center space-y-3">
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>

        {user.age && user.gender && (
          <p className="text-gray-500">
            {age}, {gender}
          </p>
        )}

        <p className="text-gray-600">{about}</p>

        <div className="flex justify-center gap-4 pt-3">
          <button
            onClick={() => handleRequestsFromFeed("ignored", _id)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Ignore
          </button>

          <button
            onClick={() => handleRequestsFromFeed("interested", _id)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}
