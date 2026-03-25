import { BASE_BACKEND_URL } from "../utils/mockData";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeProfileFromFeed } from "../utils/feedSlice";

export default function FeedUserCard({ user }) {
  const { _id, firstName, lastName, about, skills } = user;
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
          src={user.photoUrl}
          alt="profile"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-6 text-center space-y-3">
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>

        <p className="text-gray-600">{about}</p>
        <div className="flex flex-wrap gap-1">
          {skills.length > 0 &&
            skills.map((skill, index) => (
              <span
                className="px-4 py-1.5 
                bg-gray-100 
                text-gray-700 
                text-sm 
                rounded-full 
                hover:bg-blue-100 
                hover:text-blue-700 
                transition
                cursor-default"
                key={index}
              >
                {skill}
              </span>
            ))}
        </div>
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
