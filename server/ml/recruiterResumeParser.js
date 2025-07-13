const fs = require('fs');
const pdfParse = require('pdf-parse');

const semanticKeywords = {
  tech: ['javascript', 'react', 'node.js', 'express', 'mongodb', 'api', 'frontend', 'backend', 'full stack'],
  business: ['strategy', 'finance', 'analytics', 'reporting', 'budgeting'],
  general: ['communication', 'leadership', 'problem-solving', 'collaboration']
};

function calculateScore(content, keywords) {
  const lower = content.toLowerCase();
  let matched = 0;
  keywords.forEach((word) => {
    if (lower.includes(word)) matched++;
  });
  return Math.floor((matched / keywords.length) * 100);
}

function extractKeywords(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq = {};
  words.forEach(w => freq[w] = (freq[w] || 0) + 1);
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(e => e[0]);
}

async function parseRecruiterResume(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);

  const text = data.text;
  const keywords = extractKeywords(text);
  const score = calculateScore(text, [...semanticKeywords.tech, ...semanticKeywords.general]);

  return {
    score,
    topKeywords: keywords,
    feedback: [
      score >= 80 ? "Excellent match with tech requirements." : "Add more specific technical skills.",
      keywords.includes('project') ? "Projects section identified." : "Include notable projects.",
    ]
  };
}

module.exports = parseRecruiterResume;
