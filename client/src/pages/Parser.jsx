import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Divider,
} from '@mui/material';
import axios from 'axios';

const Parser = () => {
  const [file, setFile] = useState(null);
  const [industry, setIndustry] = useState('general');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return alert('Please upload a resume file.');
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('industry', industry);
    formData.append('jobDescription', jobDescription);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/parser/analyze', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Error analyzing resume');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">📄 Resume Parser</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Upload & Analyze Resume
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ mb: 2 }}>
            <label>Upload Resume (PDF):</label>
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <label>Select Industry:</label><br />
            <Select value={industry} onChange={(e) => setIndustry(e.target.value)} fullWidth>
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="technology">Technology / IT</MenuItem>
              <MenuItem value="business">Business / Finance</MenuItem>
              <MenuItem value="healthcare">Healthcare</MenuItem>
              <MenuItem value="marketing">Marketing / Communications</MenuItem>
            </Select>
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Job Description (optional)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </Box>

          <Button variant="contained" onClick={handleAnalyze} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
          </Button>
        </Paper>

        {/* Result Section */}
        {result?.score && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Compatibility Result
            </Typography>

            <Typography variant="h4" color="success.main" sx={{ my: 2 }}>
              ATS Score: {result.score}%
            </Typography>

            <Typography variant="h6" gutterBottom>Feedback</Typography>
            <ul>
              {result.feedback?.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>

            {/* Recruiter Insights */}
            {result.insights && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>Recruiter Insights</Typography>
                <Typography>🕒 Avg Time Spent: {result.insights.avgTimeSpent || 'N/A'}</Typography>
                <Typography>🔍 Focus Area: {result.insights.focusArea || 'N/A'}</Typography>

                <Typography variant="h6" sx={{ mt: 3 }}>
                  Competitive Benchmark
                </Typography>
                <Typography>
                  Your Score: {result.insights.benchmark?.yourScore || 'N/A'} / Top 10%: {result.insights.benchmark?.topScore || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  💡 {result.insights.benchmark?.message || 'No benchmark insight'}
                </Typography>
              </>
            )}
          </Paper>
        )}
      </Container>
    </>
  );
};

export default Parser;
