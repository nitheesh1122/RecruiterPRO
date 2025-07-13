const parseRecruiterResume = require('../ml/recruiterResumeParser');
const path = require('path');

const recruiterResumeParser = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Resume file missing.' });

    const result = await parseRecruiterResume(path.join(__dirname, '..', file.path));
    res.json(result);
  } catch (err) {
    console.error('Parser error:', err);
    res.status(500).json({ error: 'Failed to parse resume' });
  }
};

module.exports = recruiterResumeParser;
