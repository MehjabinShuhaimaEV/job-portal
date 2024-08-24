const express = require('express');
const router = express.Router();
const { createAdmin } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// This route should only be accessible during initial setup or by a specific mechanism
router.post('/create-admin', protect, adminOnly, async (req, res) => {
  try {
    // Add additional checks or mechanisms if necessary
    await createAdmin(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin' });
  }
});

module.exports = router;
