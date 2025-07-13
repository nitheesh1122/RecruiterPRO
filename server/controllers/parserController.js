const { parseAndScoreResume } = require('../utils/resumeParser');

const analyzeResume = async (req, res) => {
  try {
    const file = req.file;
    const industry = req.body.industry || 'general';
    const jobDescription = req.body.jobDescription || '';

    if (!file) return res.status(400).json({ error: 'Resume file required' });

    const result = await parseAndScoreResume(file.buffer, industry, jobDescription);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Parsing failed' });
  }
};

module.exports = { analyzeResume };
