const Job = require('../models/Job');

const postJob = async (req, res) => {
  try {
    const { title, description } = req.body;
    const recruiterId = req.user.id;
    const newJob = await Job.create({ title, description, recruiterId });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post job' });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const jobs = await Job.find({ recruiterId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recruiter jobs' });
  }
};

module.exports = { postJob, getMyJobs };
