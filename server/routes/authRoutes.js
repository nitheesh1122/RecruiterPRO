const express = require('express');
const router = express.Router();


const {
  sendOTPController,
  verifyOTPController,
  adminLogin
} = require('../controllers/authController');

// All handlers must be valid functions
router.post('/send-otp', sendOTPController);
router.post('/verify-otp', verifyOTPController);
router.post('/admin-login', adminLogin);

module.exports = router;  // ✅ this is essential
