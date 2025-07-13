// services/mlService.js
exports.parseResumeATS = async (filePath) => {
  // Simulate real logic or integrate your ML
  return {
    score: Math.floor(Math.random() * 40) + 60, // 60-99%
    feedback: [
      'Add more keywords matching the job description.',
      'Use consistent formatting throughout your resume.',
      'Include a Skills section with bullet points.',
      'Tailor your experience to match the job role.'
    ]
  };
};
