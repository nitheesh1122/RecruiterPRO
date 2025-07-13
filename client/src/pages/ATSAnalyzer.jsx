import React, { useState } from 'react';
import './ats.css';
import axios from 'axios';

const ATSAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [industry, setIndustry] = useState('general');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = (e) => setFile(e.target.files[0]);

  const handleAnalyze = async () => {
    if (!file) return alert('Please upload your resume.');
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('industry', industry);
    formData.append('jobDescription', jobDescription);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ats/analyze', formData);
      setResults(res.data);
    } catch (err) {
      alert('Failed to analyze resume');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="ats-container">
      <h1>Advanced ATS Resume Scanner</h1>
      <p className="subtitle">Upload your resume and job description for ATS analysis</p>

      <div className="upload-section">
        <label>Upload Resume (.pdf or .txt)</label>
        <input type="file" accept=".pdf,.txt" onChange={handleFileUpload} />

        <label>Select Your Industry</label>
        <select onChange={(e) => setIndustry(e.target.value)} value={industry}>
          <option value="general">General</option>
          <option value="technology">Technology / IT</option>
          <option value="business">Business / Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="marketing">Marketing / Communications</option>
        </select>

        <label>Paste Job Description (optional)</label>
        <textarea
          rows={5}
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      {results && (
        <div className="results">
          <h2>Score: {results.score}%</h2>
          <h3>Feedback:</h3>
          <ul>{results.feedback.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
          <h3>Benchmark: Your resume is better than {results.benchmark}% of others</h3>
        </div>
      )}
    </div>
  );
};

export default ATSAnalyzer;
