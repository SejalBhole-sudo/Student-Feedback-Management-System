import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    password: '',
    userType: 'student',
  });
  const { name, rollNo, email, password, userType } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.message) {
      alert(data.message);
      navigate('/login'); // After successful registration, redirect to Login
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="rollNo"
          value={rollNo}
          onChange={handleChange}
          placeholder="Roll Number"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
        <select
          name="userType"
          value={userType}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
