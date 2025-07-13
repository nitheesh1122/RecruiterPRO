const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const ResumeLog = require('../models/ResumeLog');

const analyzeResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumePath = req.file.path;
    const industry = req.body.industry || 'general';
    const jobDesc = req.body.jobDescription || '';

    const scriptPath = path.join(__dirname, '../services/atsMLService.py');
    const pythonProcess = spawn('python', [scriptPath, resumePath, industry, jobDesc]);

    let data = '';

    pythonProcess.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    pythonProcess.stderr.on('data', (err) => {
      console.error('Python error:', err.toString());
    });

    pythonProcess.on('close', async () => {
      try {
        const result = JSON.parse(data);

        // 📝 Log user activity
        await ResumeLog.create({
          userId,
          filename: req.file.originalname,
          score: result.score,
          feedback: result.feedback
        });

        // ✅ Respond to client
        res.json(result);

        // 🧹 Optional cleanup
        fs.unlink(resumePath, () => {});
      } catch (err) {
        console.error('Processing error:', err);
        res.status(500).json({ error: 'Failed to analyze resume' });
      }
    });
  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { analyzeResume };
