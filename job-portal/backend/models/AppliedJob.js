const mongoose = require('mongoose');
const User = require('../models/User');
const Job = require('../models/Job');

const appliedJobSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  appliedAt: { type: Date, default: Date.now }
});

const AppliedJob = mongoose.model('AppliedJob', appliedJobSchema);

module.exports = AppliedJob;
