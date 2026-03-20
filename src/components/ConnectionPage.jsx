import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

export default function Connections() {
  const connectionAdderFunction = useDispatch();
  const myConnections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_BACKEND_URL + "/user/connections", {
        withCredentials: true,
      });

      connectionAdderFunction(addConnection(response?.data?.data));
    } catch (err) {
      console.err("ERROR:" + err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!myConnections) return;

  return (
    <div>
      <h1 className="text-center my-10 font-bold uppercase tracking-wider text-2xl">
        {myConnections.length === 0
          ? "You haven't made any connections yet!"
          : "Connections"}
      </h1>
      <h3 className="text-center mb-4 font-mono text-lg">
        Discover more about your Developer Tribe!
      </h3>
      <div className="max-w-2xl mx-auto space-y-4">
        {myConnections.map((connection) => {
          const { photoUrl, firstName, lastName, about, skills, _id } =
            connection;

          return (
            <div
              key={_id}
              className="flex items-start gap-4 bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={
                  photoUrl ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {firstName} {lastName}
                </h2>

                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {about || "No bio provided"}
                </p>

                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button className="text-sm text-blue-600 hover:underline cursor-pointer">
                View Profile
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
