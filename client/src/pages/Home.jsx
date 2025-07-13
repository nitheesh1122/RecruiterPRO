import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Link,
} from '@mui/material';

const Home = () => {
  const goToLogin = () => {
    window.location.href = '/login';
  };

  const goToRegister = () => {
    window.location.href = '/register';
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      {/* NAVBAR */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => (window.location.href = '/')}
          >
            RecruiterPro
          </Typography>
          <Button color="inherit" onClick={goToLogin}>Seekers</Button>
          <Button color="inherit" onClick={goToLogin}>Recruiters</Button>
          <Button color="inherit" onClick={goToLogin}>Pricing</Button>
          <Button color="inherit" onClick={goToLogin}>Login</Button>
          <Button
            variant="outlined"
            sx={{ ml: 1, color: '#fff', borderColor: '#fff' }}
            onClick={goToRegister}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Container sx={{ mt: 8, mb: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Find Top Talent Faster with AI-Powered Parsing
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              RecruiterPro helps HR teams parse resumes, post jobs, and hire the right candidates — all in one smart platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              onClick={goToLogin}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="/assets/top-view-desktop.jpg"
              alt="RecruiterPro hero"
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* ADVERTISEMENT SECTION */}
      <Box sx={{ py: 6, backgroundColor: '#ffffff' }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
            Supercharge Your Hiring Process
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" maxWidth="lg" mx="auto" paragraph>
            Automate resume screening, manage applications, and collaborate with your team using our intuitive recruiter dashboard.
          </Typography>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="medium">
                  📄 Bulk Resume Parsing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload hundreds of resumes and let our ML-powered engine extract key skills and match them to roles instantly.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="medium">
                  💼 Smart Job Posting
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Easily post and manage job openings across departments with one clean dashboard.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="medium">
                  🤖 ML-Powered Matching
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Let AI suggest the best candidates for your roles based on parsed data and skill matching.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ backgroundColor: '#1a1a1a', color: '#ffffff', py: 3, mt: 6 }}>
        <Container>
          <Typography variant="body2" textAlign="center">
            © {new Date().getFullYear()} RecruiterPro. All rights reserved.
          </Typography>
          <Box textAlign="center" mt={1}>
            <Link href="/login" underline="hover" color="inherit" mx={1}>
              Login
            </Link>
            <Link href="/register" underline="hover" color="inherit" mx={1}>
              Sign Up
            </Link>
            <Link href="#" underline="hover" color="inherit" mx={1}>
              Privacy
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
