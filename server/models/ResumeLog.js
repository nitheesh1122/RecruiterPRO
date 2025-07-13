const mongoose = require('mongoose');

const resumeLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  score: Number,
  feedback: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResumeLog', resumeLogSchema);
