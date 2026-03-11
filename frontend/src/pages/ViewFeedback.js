import React, { useEffect, useState } from 'react';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/feedback');
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

  return (
    <div>
      <h2>All Feedback</h2>

      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <ul>
          {feedbacks.map((fb) => (
            <li key={fb._id}>
              <strong>{fb.course}</strong> - {fb.teacher} - Rating: {fb.rating} <br />
              Comments: {fb.comments || 'N/A'} <br />
              Submitted by: {fb.studentEmail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFeedback;
