import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./components/GoogleLogin";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <Dashboard/>
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
    //     <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    //   </Routes>
    // </Router>
  );
};

export default App;