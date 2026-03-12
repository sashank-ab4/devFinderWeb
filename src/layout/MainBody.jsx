import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function MainBody() {
  // this is dispatch which will update the store so i named it updating function for awareness
  const updatingFunction = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUserProfile = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_BACKEND_URL + "/profile/view", {
        withCredentials: true,
      });
      updatingFunction(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Outlet />
        </main>
        {/*  <Footer /> */}
      </div>
    </>
  );
}
