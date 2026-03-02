import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FeedbackForm from "./pages/FeedbackForm";
import ViewFeedback from "./pages/ViewFeedback";
import AdminPanel from "./pages/AdminPanel";

// Wrapper for protected admin route
const AdminRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  return userType === "admin" ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/view-feedback" element={<ViewFeedback />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
