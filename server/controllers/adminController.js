const User = require('../models/User');
const Recruiter = require('../models/Recruiter');
const Job = require('../models/Job');

const getAdminSummary = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    const recruiters = await Recruiter.find().select('-__v');
    const jobs = await Job.find().populate('recruiterId', 'name');

    res.json({
      users,
      recruiters,
      jobs
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin summary' });
  }
};

module.exports = { getAdminSummary };
