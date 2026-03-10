import React, { useState } from 'react';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    course: '',
    teacher: '',
    rating: '',
    comments: '',
    studentEmail: '', // ✅ Add studentEmail to state
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });

    const data = await response.json();
    if (data.success) {
      alert('Feedback submitted successfully');
      // Optional: reset form
      setFeedback({
        course: '',
        teacher: '',
        rating: '',
        comments: '',
        studentEmail: '',
      });
    } else {
      alert('Error: ' + data.message);
    }
  };

  return (
    <div>
      <h2>Provide Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="course"
          value={feedback.course}
          onChange={handleChange}
          placeholder="Course"
        />
        <input
          type="text"
          name="teacher"
          value={feedback.teacher}
          onChange={handleChange}
          placeholder="Teacher"
        />
        <input
          type="number"
          name="rating"
          value={feedback.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
        />
        <textarea
          name="comments"
          value={feedback.comments}
          onChange={handleChange}
          placeholder="Comments"
        />
        <input
          type="email"
          name="studentEmail"
          value={feedback.studentEmail}
          onChange={handleChange}
          placeholder="Your Email"
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
