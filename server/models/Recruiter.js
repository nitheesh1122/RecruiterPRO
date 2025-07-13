const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  companyName: String,
  companyEmail: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Recruiter', recruiterSchema);
