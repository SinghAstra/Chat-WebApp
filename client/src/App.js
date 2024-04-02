import React from "react";
import "./App.css";
import MainContainer from "./Components/MainContainer";
import Welcome from "./Components/Welcome";
import ChatArea from "./Components/ChatArea";
import Users from "./Components/Users";
import Groups from "./Components/Groups";
import CreateGroup from "./Components/CreateGroup";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "./Redux/actions/notificationAction";
import Notification from "./Components/Notification";
import { Backdrop, CircularProgress } from "@mui/material";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Navbar from "./Components/Navbar";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { open, message, severity } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();
  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  const loading = useSelector((state) => state.loading);

  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Routes for authenticated users */}
          {user && <Route path="/" element={<Navigate to="/app/welcome" />} />}
          {user && (
            <Route path="app" element={<MainContainer />}>
              <Route path="welcome" element={<Welcome />} />
              <Route path="chat/:chatId" element={<ChatArea />} />
              <Route path="users" element={<Users />} />
              <Route path="groups" element={<Groups />} />
              <Route path="create-group" element={<CreateGroup />} />
            </Route>
          )}

          {/* Route for non-authenticated users */}
          {!user && (
            <>
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          )}

          {/* Redirect to login for unauthorized sub-routes */}
          {!user && <Route path="*" element={<Navigate to="/sign-up" />} />}
        </Routes>
        <Notification
          open={open}
          onClose={() => {
            handleCloseNotification();
          }}
          message={message}
          severity={severity}
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </BrowserRouter>
    </div>
  );
};

export default App;
