const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig'); // Import the multer configuration
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Apply the protect middleware to all routes in this router
router.use(protect);

// User routes
router.get('/profile', userController.getProfile);
router.get('/getSavedjobs',userController.getSavedJobs);
router.get('/applied-jobs',userController.getAppliedJobs);
router.get('/saved-jobs/:jobId',userController.savedJobs);
router.get('/check-applied/:jobId',userController.checkApplied);


// Route for updating user data with profile picture upload
router.post('/updateUserdata', upload.single('profilePicture'), userController.updateUserdata);
router.post('/savejob/:jobId',userController.saveJob),
router.post('/applyjob/:jobId',userController.applyForJob);



router.delete('/removeSavedjob/:jobId',userController.removeSavedJob);




module.exports = router;