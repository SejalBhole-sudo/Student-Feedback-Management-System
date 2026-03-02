import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();

  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      
      if (response.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.userType); 
        navigate("/dashboard");
      } else {
        
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
