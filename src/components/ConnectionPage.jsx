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
    <div className="px-4 sm:px-6">
      <h1 className="text-center my-8 sm:my-10 font-bold uppercase tracking-wider text-xl sm:text-2xl">
        {myConnections.length === 0
          ? "You haven't made any connections yet!"
          : "Connections"}
      </h1>

      <h3 className="text-center mb-6 font-sans text-sm sm:text-lg text-gray-600">
        Discover more about your Developer Tribe!
      </h3>

      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {myConnections.map((connection) => {
          const { photoUrl, firstName, lastName, about, skills, _id } =
            connection;

          return (
            <div
              key={_id}
              className="
            flex flex-col sm:flex-row
            items-center sm:items-start
            gap-4
            bg-white border rounded-2xl
            shadow-sm p-4 sm:p-5
            hover:shadow-md transition-all hover:scale-[1.01] duration-200
          "
            >
              <img
                className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover"
                src={
                  photoUrl ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-base sm:text-lg font-semibold">
                  {firstName} {lastName}
                </h2>

                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {about || "No bio provided"}
                </p>

                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                    {skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-200 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button className="mt-3 sm:mt-0 text-sm text-blue-600 hover:underline">
                View Profile
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
