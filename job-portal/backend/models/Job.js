const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  position: { type: String },
  requirements: { type: String },
  location: { type: String },
  salary: { type: String }, 
  jobType: { type: String },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
