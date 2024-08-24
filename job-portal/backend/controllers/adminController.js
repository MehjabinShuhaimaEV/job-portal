// Required modules
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const AppliedJob = require('../models/AppliedJob');
const Job = require('../models/Job');

// Create a new admin
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      return res.status(400).json({ message: 'An admin already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the new admin user
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all user applications with populated user and job details
exports.getAllUserApplications = async (req, res) => {
  try {
    const applications = await AppliedJob.find()
      .populate('user', 'name email')  // Populate user name and email
      .populate('job', 'jobTitle');    // Populate job title

    res.json(applications);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ error: 'Failed to fetch user applications' });
  }
};

// Get a single application by its ID
exports.getApplication = async (req, res) => {
  try {
    const application = await AppliedJob.findById(req.params.id)
      .populate('user', 'name email')   // Populate user name and email
      .populate('job', 'jobTitle');     // Populate job title

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Error fetching application details' });
  }
};

// Accept a job application
exports.acceptApplication = async (req, res) => {
  try {
    const application = await AppliedJob.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update application status to 'Accepted'
    application.status = 'Accepted';
    await application.save();

    res.json({ message: 'Application accepted successfully' });
  } catch (error) {
    console.error('Error accepting application:', error);
    res.status(500).json({ message: 'Error accepting application' });
  }
};

// Reject a job application
exports.rejectApplication = async (req, res) => {
  try {
    const application = await AppliedJob.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update application status to 'Rejected'
    application.status = 'Rejected';
    await application.save();

    res.json({ message: 'Application rejected successfully' });
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({ message: 'Error rejecting application' });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Count total jobs
    const totalJobs = await Job.countDocuments();

    // Count total applications
    const totalApplications = await AppliedJob.countDocuments();

    // Assuming all jobs are active for simplicity
    const activeJobs = totalJobs;

    // Count pending applications
    const pendingApplications = await AppliedJob.countDocuments({ status: 'Pending' });

    res.json({
      totalJobs,
      totalApplications,
      activeJobs,
      pendingApplications,
    });
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics', error });
  }
};
