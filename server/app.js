const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/recruiter', require('./routes/recruiterRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/parser', require('./routes/parserRoutes'));
app.use('/api/ats', require('./routes/atsRoutes'));
module.exports = app;
