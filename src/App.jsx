import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import LeftSideBar from "./component/LeftSideBar";
import ChatContainer from "./component/ChatContainer";
import RightSideBar from "./component/RightSideBar";
import LandingPage from "./component/Landing";
import EditProfile from "./component/EditProfile";
import Pnf from "./pages/Pnf";

import ProtectedRoute from "./pages/ProtectedRoute";
import PublicRoute from "./pages/PublicRoute ";

function App() {
  const [userSelected, setUserSelected] = useState(false);
  const [selecteduser, setSelectedUser] = useState(null);

  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* ===== PROTECTED ROUTES ===== */}
      <Route
        path="/enter"
        element={
          <ProtectedRoute>
            <div className="h-screen flex">
              <LeftSideBar
                setUserSelected={setUserSelected}
                setSelectedUser={setSelectedUser}
              />

              <ChatContainer
                userSelected={userSelected}
                selecteduser={selecteduser}
              />

              {userSelected && (
                <RightSideBar selecteduser={selecteduser} />
              )}
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/editProfile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      {/* ===== PAGE NOT FOUND ===== */}
      <Route path="*" element={<Pnf />} />
    </Routes>
  );
}

export default App;
