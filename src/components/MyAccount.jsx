import { useSelector } from "react-redux";
import { MdOutlineLocalPhone } from "react-icons/md";
import { LuMailCheck } from "react-icons/lu";
import { getInitials } from "../utils/mockData";
import { Link } from "react-router-dom";

export default function MyAccountPage() {
  const user = useSelector((store) => store.user);
  if (!user) return <div>Loading...</div>;
  const {
    firstName,
    lastName,
    photoUrl,
    phoneNumber,
    emailId,
    about,
    age,
    gender,
    skills,
  } = user;

  return (
    user && (
      <>
        <h2 className="text-center mt-5 uppercase tracking-wider font-semibold">
          My Account
        </h2>
        <div className=" mb-6 inset-x-0 h-px bg-linear-to-r from-transparent via-black to-transparent mt-2" />

        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-sm mt-10">
          <div className="flex flex-col items-center sm:items-start">
            <div className="relative">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border-2 border-green-400"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center border">
                  <span className="text-xl font-semibold text-gray-700">
                    {getInitials(firstName, lastName)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {firstName} {lastName}
              </h2>
              <Link
                to={"/profile"}
                className="text-gray-500 cursor-pointer hover:text-gray-800"
              >
                Edit
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-1">{about}</p>

            <hr className="my-4 border-gray-300" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-3">
                <p>India</p>
                <p>{age}</p>
                <p>{gender}</p>
              </div>

              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <MdOutlineLocalPhone size={20} />
                  {phoneNumber}
                </p>
                <p className="flex items-center gap-2">
                  <LuMailCheck size={20} />
                  {emailId}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.length > 0 ? (
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
              ))
            ) : (
              <p className="text-sm text-gray-500">No Skills added yet</p>
            )}
          </div>
        </div>
      </>
    )
  );
}
