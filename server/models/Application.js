const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  matchScore: Number, // Set by ML or random
  status: { type: String, default: 'Pending' }, // Can be Shortlisted / Rejected
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
