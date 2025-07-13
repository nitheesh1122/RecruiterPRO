const pdfParse = require('pdf-parse');

const industryKeywords = {
  general: ['team', 'communication', 'experience', 'skills'],
  technology: ['JavaScript', 'React', 'API', 'Node.js', 'Python'],
  business: ['finance', 'analysis', 'management', 'strategy'],
  healthcare: ['clinical', 'patients', 'diagnosis', 'treatment'],
  marketing: ['branding', 'SEO', 'content', 'social media']
};

const parseAndScoreResume = async (buffer, industry, jobDesc) => {
  const data = await pdfParse(buffer);
  const text = data.text.toLowerCase();

  const keywords = [...(industryKeywords[industry] || [])];

  if (jobDesc) {
    const jobWords = jobDesc.toLowerCase().split(/\W+/).filter(w => w.length > 4);
    keywords.push(...jobWords.slice(0, 10)); // take top 10 for feedback
  }

  const total = keywords.length;
  const matched = keywords.filter(k => text.includes(k)).length;
  const score = Math.floor((matched / total) * 100);

  const feedback = [];

  if (score > 75) {
    feedback.push("Your resume is well-optimized for ATS.");
  } else if (score > 50) {
    feedback.push("Your resume is decent but could include more targeted keywords.");
  } else {
    feedback.push("Your resume needs better alignment with the job description.");
  }

  keywords.forEach(k => {
    if (!text.includes(k)) feedback.push(`Missing keyword: "${k}"`);
  });

  return {
    score,
    feedback
  };
};

module.exports = { parseAndScoreResume };
