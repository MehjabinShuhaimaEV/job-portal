const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new job 
router.post('/createjob', async (req, res) => {
    const { company, position, jobTitle, description, requirements, location, salary, jobType } = req.body;

    const newJob = new Job({
        company,
        position,
        jobTitle,
        description,
        requirements,
        location,
        salary,
        jobType
    });

    try {
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing job
router.put('/updatejob/:id', async (req, res) => {
    console.log("update working")
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//getting single job details to update 

router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete a job
router.delete('/deletejob/:id', async (req, res) => {
    try {
        console.log("Received delete request for job ID:", req.params.id);

        const job = await Job.findById(req.params.id);

        if (!job) {
            console.log("Job not found");
            return res.status(404).json({ message: 'Job not found' });
        }

        await Job.findByIdAndDelete(req.params.id);
        console.log("Job deleted successfully");

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error("Error deleting job:", error.message);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
