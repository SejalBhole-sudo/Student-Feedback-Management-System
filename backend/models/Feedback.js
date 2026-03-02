const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  course: { type: String, required: true },
  teacher: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: { type: String },
  studentEmail: { type: String, required: true },  // Optional: to track user
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);

