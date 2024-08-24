const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is in models/User.js

// General protection middleware
const protect = async (req, res, next) => {
      
  try {
    
    const authHeader = req.headers['authorization'];
    
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("no token provided ")
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    const user = await User.findById(decoded.id);
   
    if (!user) {
      console.log("user not founded")
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
   
    next();

  } catch (err) {
    console.log("inside catch works")
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Server error' });
    }
};

// Admin-only middleware
const adminOnly = (req, res, next) => {
  console.log("adminonly middleware works")
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

module.exports = { protect, adminOnly };