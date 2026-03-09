import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filters, setFilters] = useState({ teacher: '', course: '' });

  const fetchFeedbacks = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:5000/api/feedback?${query}`);
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.feedbacks);
      } else {
        alert('Error fetching feedbacks: ' + data.message);
      }
    } catch (error) {
      alert('Error connecting to backend');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchFeedbacks();
  };

  return (
    <div>
      <h2>Admin Panel – View Feedback</h2>

      <input
        type="text"
        name="teacher"
        placeholder="Filter by Teacher"
        value={filters.teacher}
        onChange={handleChange}
      />
      <input
        type="text"
        name="course"
        placeholder="Filter by Course"
        value={filters.course}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>

      {feedbacks.length === 0 ? (
        <p>No feedback matches your filters.</p>
      ) : (
        <ul>
          {feedbacks.map((fb) => (
            <li key={fb._id}>
              <strong>{fb.course}</strong> - {fb.teacher} - Rating: {fb.rating}<br />
              Comments: {fb.comments || 'N/A'}<br />
              Submitted by: {fb.studentEmail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
