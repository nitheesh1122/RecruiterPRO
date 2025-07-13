import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container, Paper,
  Box, CircularProgress, List, ListItem, Chip
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { motion } from 'framer-motion';
import axios from 'axios';

const ParserRecruiter = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleAnalyze = async () => {
    if (!file) return alert('Please upload a file');
    const formData = new FormData();
    formData.append('resume', file);

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/recruiter/upload-resume',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Resume parsing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">📊 Resume Parser Pro (Recruiter)</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Upload Resume</Typography>

            <Box sx={{ mb: 3 }}>
              <Button
                component="label"
                variant="contained"
                startIcon={<UploadFileIcon />}
              >
                Choose File
                <input hidden type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
              </Button>
              {file && (
                <Typography sx={{ mt: 1 }} color="primary">
                  📄 {file.name}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={loading}
              color="success"
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze'}
            </Button>
          </Paper>

          {result && (
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" color="success.main" gutterBottom>
                ✅ Match Score: {result.score}%
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>📌 Top Keywords</Typography>
                {result.topKeywords.length ? (
                  result.topKeywords.map((k, i) => (
                    <Chip key={i} label={k} sx={{ m: 0.5 }} color="info" />
                  ))
                ) : (
                  <Typography>No keywords found.</Typography>
                )}
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" gutterBottom>📝 Feedback</Typography>
                <List>
                  {result.feedback.length ? (
                    result.feedback.map((f, i) => (
                      <ListItem key={i}>• {f}</ListItem>
                    ))
                  ) : (
                    <ListItem>No specific feedback.</ListItem>
                  )}
                </List>
              </Box>
            </Paper>
          )}
        </Container>
      </motion.div>
    </>
  );
};

export default ParserRecruiter;
