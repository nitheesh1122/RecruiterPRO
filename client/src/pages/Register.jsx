import React, { useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, Paper,
  RadioGroup, FormControlLabel, Radio, Slide
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Register = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    age: '',
    dob: '',
    degree: '',
    companyName: '',
    companyEmail: '',
    phone: '',
    otp: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
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
      console.error(error);
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const payload = {
        phone: formData.phone,
        code: formData.otp,
        role,
        ...formData
      };

      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', payload);
      alert(`${role === 'user' ? 'User' : 'Recruiter'} registered successfully!`);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      window.location.href = `/dashboard/${role}`;
    } catch (error) {
      console.error(error);
      alert('OTP verification failed!');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>

          {/* Step 1: Form */}
          {step === 1 && (
            <Slide direction="up" in={step === 1}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>Select Role:</Typography>
                <RadioGroup row value={role} onChange={(e) => setRole(e.target.value)}>
                  <FormControlLabel value="user" control={<Radio />} label="Job Seeker" />
                  <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                </RadioGroup>

                <TextField
                  fullWidth label="Name" name="name" margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth label="Email" name="email" margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth label="Address" name="address" margin="normal"
                  onChange={handleChange}
                />

                {role === 'user' && (
                  <>
                    <TextField
                      fullWidth label="Age" name="age" type="number" margin="normal"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth label="Date of Birth" name="dob" type="date" margin="normal"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth label="Degree" name="degree" margin="normal"
                      onChange={handleChange}
                    />
                  </>
                )}

                {role === 'recruiter' && (
                  <>
                    <TextField
                      fullWidth label="Company Name" name="companyName" margin="normal"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth label="Company Email" name="companyEmail" margin="normal"
                      onChange={handleChange}
                    />
                  </>
                )}

                <TextField
                  fullWidth label="Phone (+91...)" name="phone" margin="normal"
                  onChange={handleChange}
                />

                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSendOtp}>
                  Send OTP
                </Button>
              </Box>
            </Slide>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <Slide direction="up" in={step === 2}>
              <Box>
                <TextField
                  fullWidth label="Enter OTP" name="otp" margin="normal"
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleVerifyOtp}
                >
                  Verify & Register
                </Button>
              </Box>
            </Slide>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Register;
