import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome to Student Feedback Management System</h2>
      <button onClick={() => navigate('/login')} style={{ margin: '10px' }}>
        Login
      </button>
      <button onClick={() => navigate('/register')} style={{ margin: '10px' }}>
        Register
      </button>
    </div>
  );
}

export default Home;
