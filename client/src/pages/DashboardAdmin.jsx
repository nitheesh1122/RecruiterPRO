import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const [userRes, recruiterRes, jobRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', { headers }),
          axios.get('http://localhost:5000/api/admin/recruiters', { headers }),
          axios.get('http://localhost:5000/api/admin/jobs', { headers }),
        ]);
        setUsers(userRes.data);
        setRecruiters(recruiterRes.data);
        setJobs(jobRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">🛠 Admin Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Overview Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">👤 Total Users</Typography>
                <Typography variant="h4">{users.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">🏢 Total Recruiters</Typography>
                <Typography variant="h4">{recruiters.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">📄 Total Jobs</Typography>
                <Typography variant="h4">{jobs.length}</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Registered Users */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>👥 Registered Users</Typography>
            <Divider sx={{ mb: 2 }} />
            {users.length === 0 ? (
              <Typography>No users found.</Typography>
            ) : (
              users.map((user, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography>{user.name} — {user.email}</Typography>
                </Box>
              ))
            )}
          </Paper>

          {/* Registered Recruiters */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>🏢 Registered Recruiters</Typography>
            <Divider sx={{ mb: 2 }} />
            {recruiters.length === 0 ? (
              <Typography>No recruiters found.</Typography>
            ) : (
              recruiters.map((rec, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography>{rec.name} ({rec.companyName}) — {rec.email}</Typography>
                </Box>
              ))
            )}
          </Paper>
        </Container>
      </motion.div>
    </>
  );
};

export default DashboardAdmin;
