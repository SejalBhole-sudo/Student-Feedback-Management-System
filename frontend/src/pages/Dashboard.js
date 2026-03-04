import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (!storedUserType) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUserType(storedUserType);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the {userType === "admin" ? "Admin" : "Student"} Dashboard 🎓</h2>
      <div className="button-group">
        {userType === "student" && (
          <>
            <button onClick={() => navigate("/feedback")}>
              Provide Feedback
            </button>
            <button onClick={() => navigate("/view-feedback")}>
              View Submitted Feedback
            </button>
          </>
        )}
        {userType === "admin" && (
          <button onClick={() => navigate("/admin")}>
            Go to Admin Panel
          </button>
        )}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;