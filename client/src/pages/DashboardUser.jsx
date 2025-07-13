import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Divider,
  Box  // ⬅️ Add this line
} from '@mui/material';

import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardUser = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/jobs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    alert(`Applied to job ID: ${jobId}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">👤 Job Seeker Dashboard</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} to="/parser" color="inherit">
              Resume Parser
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Jobs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Available Jobs</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              {jobs.length === 0 ? (
                <Typography color="text.secondary" sx={{ px: 2 }}>
                  No jobs available
                </Typography>
              ) : (
                jobs.map((job) => (
                  <Grid item xs={12} md={6} key={job._id}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Paper elevation={1} sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleApply(job._id)}
                        >
                          Apply
                        </Button>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </Container>
      </motion.div>
    </>
  );
};

export default DashboardUser;
