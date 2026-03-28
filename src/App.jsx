import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainBody from "./layout/MainBody";
import Login from "./components/LoginPage";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import MenuLayout from "./components/MenuLayout";
import ResetPassword from "./components/ResetPasswordPage";

import MessageFeed from "./components/ChatPage";
import MyAccountPage from "./components/MyAccount";
const Feed = lazy(() => import("./components/Feed"));
const Connections = lazy(() => import("./components/ConnectionPage"));
const Requests = lazy(() => import("./components/RequestsPage"));
const Profile = lazy(() => import("./components/ProfileView"));

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<MainBody />}>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route element={<MenuLayout />}>
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/connections" element={<Connections />} />
                  <Route path="/requests" element={<Requests />} />
                </Route>

                <Route path="/profile" element={<Profile />} />
                <Route path="/my-account" element={<MyAccountPage />} />
                <Route path="/chat/:textingUserId" element={<MessageFeed />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
