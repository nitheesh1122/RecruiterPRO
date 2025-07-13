import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, TextField, RadioGroup, FormControlLabel, Radio, Paper, Slide
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  const [role, setRole] = useState('user');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    otp: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', {
        phone: formData.phone
      });
      alert('OTP sent!');
      setStep(2);
    } catch (error) {
      alert('Failed to send OTP');
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        phone: formData.phone,
        code: formData.otp,
        role
      });

      alert(`${role} login successful`);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      window.location.href = `/dashboard/${res.data.role}`;
    } catch (error) {
      alert('OTP verification failed');
      console.error(error);
    }
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin-login', {
        username: formData.username,
        password: formData.password
      });

      alert('Admin login successful');
      localStorage.setItem('role', 'admin');
      window.location.href = '/dashboard/admin';
    } catch (error) {
      alert('Invalid admin credentials');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          {/* Role Selection */}
          <Typography variant="subtitle1">Select Role:</Typography>
          <RadioGroup row value={role} onChange={(e) => { setRole(e.target.value); setStep(1); }}>
            <FormControlLabel value="user" control={<Radio />} label="Job Seeker" />
            <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>

          <Box mt={3}>
            {/* Admin Login */}
            {role === 'admin' && (
              <>
                <TextField
                  label="Admin Username"
                  name="username"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <Button variant="contained" fullWidth onClick={handleAdminLogin}>
                  Login as Admin
                </Button>
              </>
            )}

            {/* Phone Input (User/Recruiter) */}
            {role !== 'admin' && step === 1 && (
              <Slide direction="up" in={step === 1} mountOnEnter unmountOnExit>
                <Box>
                  <TextField
                    label="Phone (+91...)"
                    name="phone"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                  <Button variant="contained" fullWidth onClick={handleSendOtp}>
                    Send OTP
                  </Button>
                </Box>
              </Slide>
            )}

            {/* OTP Verification */}
            {role !== 'admin' && step === 2 && (
              <Slide direction="up" in={step === 2} mountOnEnter unmountOnExit>
                <Box>
                  <TextField
                    label="Enter OTP"
                    name="otp"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                  <Button variant="contained" fullWidth onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                </Box>
              </Slide>
            )}
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
