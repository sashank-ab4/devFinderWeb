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
    <div className="bg-white rounded-2xl shadow-md border overflow-hidden max-w-sm w-full mx-auto">
      <div className="flex justify-center mt-6">
        <div className="w-34 h-34 rounded-full overflow-hidden border shadow-sm">
          <img
            src={user.photoUrl}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between h-[250px]">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {firstName} {lastName}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-2">{about}</p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {skills?.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
              >
                {skill}
              </span>
            ))}

            {skills?.length > 4 && (
              <span className="text-xs text-gray-500">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleRequestsFromFeed("ignored", _id)}
            className="flex-1 py-2 cursor-pointer rounded-lg bg-gray-200 text-gray-700 text-sm font-medium"
          >
            Ignore
          </button>

          <button
            onClick={() => handleRequestsFromFeed("interested", _id)}
            className="flex-1 py-2 cursor-pointer rounded-lg bg-blue-600 text-white text-sm font-medium"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}
