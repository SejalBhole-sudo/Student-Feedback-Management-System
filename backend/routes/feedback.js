const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// POST: Submit Feedback
router.post('/', async (req, res) => {
  const { course, teacher, rating, comments, studentEmail } = req.body;

  if (!course || !teacher || !rating || !studentEmail) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const newFeedback = new Feedback({
      course,
      teacher,
      rating,
      comments,
      studentEmail,
    });

    await newFeedback.save();
    res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error submitting feedback', error: err.message });
  }
});

// ✅ GET: View All Feedback
// GET /api/feedback?teacher=John&course=Math
// routes/feedback.js
router.get('/', async (req, res) => {
    const { teacher, course } = req.query;
    let filter = {};
  
    if (teacher) {
      filter.teacher = { $regex: teacher, $options: 'i' }; // Case-insensitive
    }
  
    if (course) {
      filter.course = { $regex: course, $options: 'i' };
    }
  
    try {
      const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
      res.status(200).json({ success: true, feedbacks });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching feedbacks', error: err.message });
    }
  });
  
  
module.exports = router;
