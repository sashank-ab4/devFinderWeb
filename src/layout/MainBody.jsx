import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/mockData";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import HeroSection from "./HeroSection";
import MiddleSection from "./MiddleSection";

export default function MainBody() {
  // this is dispatch which will update the store so i named it updating function for idea
  const updatingFunction = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const isHomePage = location.pathname === "/";
  const fetchUserProfile = async () => {
    if (
      location.pathname.startsWith("/login") ||
      location.pathname.startsWith("/reset-password")
    ) {
      return;
    }
    if (userData) return;
    try {
      const res = await axios.get(BASE_BACKEND_URL + "/profile/view", {
        withCredentials: true,
      });
      updatingFunction(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
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
        {isHomePage && <HeroSection />}
        {isHomePage && <MiddleSection />}
        {isHomePage && <Footer />}
      </div>
    </>
  );
}
