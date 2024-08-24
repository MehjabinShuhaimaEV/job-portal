const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this router
router.use(protect);

// Routes for managing applications and dashboard stats
router.get('/user-applications', adminController.getAllUserApplications);
router.get('/application/:id', adminController.getApplication);
router.get('/dashboard-stats', adminController.getDashboardStats);

// Routes for accepting or rejecting applications
router.post('/application/:id/accept', adminOnly, adminController.acceptApplication);
router.post('/application/:id/reject', adminOnly, adminController.rejectApplication);

module.exports = router;
