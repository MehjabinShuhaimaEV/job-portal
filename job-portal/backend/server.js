// Import dependencies
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Import routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Load environment variables
dotenv.config();

// MongoDB connection URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust the port if necessary for your frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api/auth', authRoutes); // Route for authentication
app.use('/api/jobs', jobRoutes); // Route for job management
app.use('/api/user', userRoutes); // Route for user management
app.use('/api/admin', adminRoutes); // Route for admin management


app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
