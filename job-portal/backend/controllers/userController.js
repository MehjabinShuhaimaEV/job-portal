const User = require('../models/User');
const Job = require('../models/Job');
const AppliedJob = require('../models/AppliedJob');

// userController.js
 exports.getProfile = async (req, res) => {
   
   try {
    const user = await User.findById(req.user.id).select('-password');// Exclude password
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.updateUserdata = async (req, res) => {
  try {
    
    const userId = req.user._id;
    const updateData = { ...req.body };

    // If a profile picture was uploaded, save the path
    if (req.file) {
      
      updateData.profilePicture = req.file.path; // Save the file path to the database
    }

    

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully' });
    
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.getAppliedJobs = async (req, res) => {
 
  try {
    const userId = req.user.id; // Extract user ID from authenticated user
    
    const appliedJobs = await AppliedJob.find({ user: userId })
      .populate('job') // Populate the job details
      .exec();
    
    res.json(appliedJobs);
    
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
  

  
  exports.savedJobs = async (req, res) => {
    
    const {jobId}  = req.params;
    const userId = req.user.id;
   
    try {
      const user = await User.findById(userId);
      
      const isSaved = user.savedJobs.includes(jobId);
      
      res.status(200).json({ isSaved });
    } catch (error) {
      res.status(500).json({ message: 'Error checking saved job status', error });
    }
  };

  
  exports.saveJob = async (req, res) => {
  
    const { jobId } = req.params;
    const userId = req.user.id; // Assume the user is authenticated
  
    try {
      const user = await User.findById(userId);
      if (!user.savedJobs.includes(jobId)) {
        user.savedJobs.push(jobId);
        await user.save();
      }
      res.status(200).json({ message: 'Job saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving job', error });
    }
  };
  


 // Get saved jobs

 exports.getSavedJobs = async (req, res) => {
  
  const userId = req.user.id;
  

  try {
    const user = await User.findById(userId).populate('savedJobs');
    res.status(200).json(user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved jobs', error });
  }
};

exports.removeSavedJob = async (req, res) => {
  
  const userId = req.user.id;
  const jobId = req.params.jobId;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedJobs: jobId } }, // Removes the jobId from the savedJobs array
      { new: true }
    ).populate('savedJobs');

    res.status(200).json(user.savedJobs); // Return the updated saved jobs list
  } catch (error) {
    res.status(500).json({ message: 'Error removing saved job', error });
  }
};



exports.applyForJob = async (req, res) => {
 
  
  try {
    const { jobId } = req.params;
    
    const userId = req.user._id; 
   

   
    const existingApplication = await AppliedJob.findOne({ job: jobId, user: userId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    // Create a new application
    const appliedJob = new AppliedJob({ job: jobId, user: userId });
    
    await appliedJob.save();
    
    res.status(201).json({ message: 'Job application successful.', appliedJob });
  } catch (error) {
    res.status(500).json({ message: 'Error applying for job.', error });
  }
};



exports.checkApplied = async (req, res) => {
  
  try {
    const userId = req.user._id;  // Get the user ID from the authenticated user
    

    const jobId = req.params.jobId;  // Get the job ID from the request parameters
   

    // Check if the user has applied for the job
    const appliedJob = await AppliedJob.findOne({ user: userId, job: jobId });
   

    // If appliedJob is found, isApplied is true, otherwise false
    const isApplied = !!appliedJob;
   

    // Send response
    res.json({ isApplied });
  } catch (error) {
    console.error('Error checking if job is applied:', error);
    res.status(500).json({ message: 'Server error' });
  }
};