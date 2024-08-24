const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Get all applications (admin access only)
router.get('/admin/user-applications', protect, adminOnly, async (req, res) => {
  try {
    const applications = await Application.find().populate('job').populate('user');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific application by ID (admin access only)
router.get('/admin/user-applications/:id', protect, adminOnly, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job').populate('user');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update application status and comments (admin access only)
router.put('/admin/user-applications/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, comments } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update fields
    if (status) application.status = status;
    if (comments) application.comments = comments;

    await application.save();
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
