import { useState } from "react";
import FeedUserCard from "./FeedUserCard";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function ProfileEditor({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [toast, setToast] = useState(false);

  const saveEditUpdaterFunction = useDispatch();
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const newSkill = input.trim();

      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }

      setInput("");
    }
  };
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        BASE_BACKEND_URL + "/profile/edit",
        { firstName, lastName, age, photoUrl, about, gender, skills },
        { withCredentials: true },
      );

      saveEditUpdaterFunction(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow-lg rounded-xl p-8 border">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Edit Profile
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>

              <select
                className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500"
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">About</label>

              <textarea
                rows="3"
                className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="border rounded-xl p-3 flex flex-wrap gap-2">
              <label className="block text-sm font-medium mb-1 w-full">
                Skills
              </label>

              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)}>✕</button>
                </div>
              ))}

              <input
                type="text"
                className="flex-1 min-w-[120px] outline-none"
                value={input}
                onKeyDown={handleKeyDown}
                placeholder="Type a skill and press Enter"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Photo URL
              </label>

              <input
                type="text"
                className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <button
              onClick={handleEdit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex items-start justify-center">
          <div className="w-full max-w-sm">
            <FeedUserCard
              user={{ firstName, lastName, age, gender, about, photoUrl }}
            />
          </div>
        </div>
      </div>
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Profile saved successfully.
        </div>
      )}
    </>
  );
}
