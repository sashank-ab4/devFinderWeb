import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

export default function Connections() {
  const connectionAdderFunction = useDispatch();
  const myConnections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    const response = await axios.get(BASE_BACKEND_URL + "/user/connections", {
      withCredentials: true,
    });
    console.log(response.data.data);
    connectionAdderFunction(addConnection(response?.data?.data));
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!myConnections) return;
  if (myConnections.length === 0) return <h1>No Connections Found!</h1>;
  return (
    <div>
      <h1 className="text-center my-10 font-bold uppercase tracking-wider">
        {" "}
        Connections{" "}
      </h1>
      {myConnections.map((connection) => {
        const { photoUrl, firstName, lastName, age, gender, about } =
          connection;
        return (
          <>
            <div className="card card-side bg-[#e5e7e8] shadow-sm border h-full w-100 mx-auto">
              <figure className="p-2 m-4">
                <img
                  className="w-20 h-20"
                  src={
                    photoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                />
              </figure>
              <div className="card-body text-left">
                <h2 className="card-title ">
                  {firstName} {lastName}
                </h2>
                <p>{about}</p>
                <div className="card-actions items-start">
                  <div className="badge badge-outline">{age}</div>
                  <div className="badge badge-outline">{gender}</div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
