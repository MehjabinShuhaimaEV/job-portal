const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], // Possible values
    default: 'pending'
  }
});

module.exports = mongoose.model('Application', applicationSchema);
