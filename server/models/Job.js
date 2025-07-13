const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  skillsRequired: [String],
  experience: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
