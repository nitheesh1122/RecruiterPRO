import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardRecruiter = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/recruiter/my-jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPostedJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handlePostJob = async () => {
    if (!jobTitle || !jobDesc) return alert('Enter job title and description');
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/recruiter/post-job', {
        title: jobTitle,
        description: jobDesc
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setJobTitle('');
      setJobDesc('');
      fetchMyJobs();
    } catch (error) {
      console.error('Failed to post job', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">🏢 Recruiter Dashboard</Typography>
          <div>
            <Button component={Link} to="/recruiter-parser" color="inherit">
              Resume Parser
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          {/* Post Job */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6">Post a Job</Typography>
            <TextField
              label="Job Title"
              fullWidth
              sx={{ mt: 1, mb: 2 }}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <TextField
              label="Job Description"
              fullWidth
              multiline
              minRows={3}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handlePostJob}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Post Job'}
            </Button>
          </Paper>

          {/* Posted Jobs */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>My Posted Jobs</Typography>
            {postedJobs.length === 0 ? (
              <Typography color="text.secondary">No jobs posted yet.</Typography>
            ) : (
              <Grid container spacing={2}>
                {postedJobs.map((job, index) => (
                  <Grid item xs={12} key={index}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Paper elevation={1} sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">{job.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{job.description}</Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Container>
      </motion.div>
    </>
  );
};

export default DashboardRecruiter;
