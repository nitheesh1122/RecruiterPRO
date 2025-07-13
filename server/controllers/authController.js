const { sendOTP, verifyOTP } = require('../services/twilioService');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Recruiter = require('../models/Recruiter');

// ✅ Send OTP Controller
const sendOTPController = async (req, res) => {
  try {
    const { phone } = req.body;
    await sendOTP(phone);
    res.json({ success: true, message: 'OTP sent!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Verify OTP Controller (the one you shared)
const verifyOTPController = async (req, res) => {
  try {
    const { phone, code, role } = req.body;
    const verification = await verifyOTP(phone, code);

    if (verification.status !== 'approved') {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    let userData;

    if (role === 'user') {
      const { name, email, address, age, dob, degree } = req.body;

      userData = await User.findOne({ phone });

      if (!userData) {
        userData = await User.create({
          name,
          email,
          address,
          age,
          dob,
          degree,
          phone
        });
      }

    } else if (role === 'recruiter') {
      const { name, email, address, companyName, companyEmail } = req.body;

      userData = await Recruiter.findOne({ phone });

      if (!userData) {
        userData = await Recruiter.create({
          name,
          email,
          address,
          companyName,
          companyEmail,
          phone
        });
      }

    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const token = jwt.sign({ id: userData._id, role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ success: true, token, role, message: `${role} registered and authenticated` });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin Login Controller
const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.json({ success: true, message: 'Admin authenticated' });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
};

// ✅ EXPORT all controllers here!
module.exports = {
  sendOTPController,
  verifyOTPController,
  adminLogin
};
