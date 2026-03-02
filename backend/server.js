const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true                
}));
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error('❌ MongoDB connection failed:', err.message));
