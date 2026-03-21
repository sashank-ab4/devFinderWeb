import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainBody from "./layout/MainBody";
import Login from "./components/LoginPage";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import ProfileView from "./components/ProfileView";
import Connections from "./components/ConnectionPage";
import Requests from "./components/RequestsPage";
import MenuLayout from "./components/MenuLayout";
import ResetPassword from "./components/ResetPasswordPage";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
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

              <Route path="/profile" element={<ProfileView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
