// controllers/userController.js
const Job = require('../models/Job');
const Application = require('../models/Application');
const Resume = require('../models/Resume');
const parseResumeATS = require('../ml/mlService'); // make sure this exists

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'phone');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const applyJob = async (req, res) => {
  try {
    const { jobId, resumeId } = req.body;
    const score = Math.floor(Math.random() * 100); // placeholder

    const application = await Application.create({
      jobId,
      applicantId: req.user.id,
      resumeId,
      matchScore: score
    });

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadResume = async (req, res) => {
  try {
    const { path, originalname } = req.file;
    const result = await parseResumeATS(path); // from mlService.js
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getJobs,
  applyJob,
  uploadResume, // ✅ don't forget this
};
