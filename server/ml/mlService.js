// server/ml/mlService.js
const fs = require('fs');

async function parseResumeATS(filePath) {
  // Dummy logic for now (read text and simulate results)
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Simulate some analysis (in real projects, use NLP models)
  const keywords = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python'];
  const matched = keywords.filter(kw => fileContent.includes(kw));

  const score = Math.min(100, matched.length * 20);
  const feedback = matched.length
    ? [`Good match on keywords: ${matched.join(', ')}`]
    : ['No relevant keywords found. Try adding more job-specific terms.'];

  return {
    score,
    feedback,
    heatmap: [], // can be extended
    insights: {
      avgTimeSpent: '6s',
      focusArea: 'Skills',
      benchmark: {
        yourScore: score,
        topScore: 90,
        message: score > 70 ? 'You are close to top resumes!' : 'Needs improvement to match top resumes.',
      }
    }
  };
}

module.exports = parseResumeATS;
