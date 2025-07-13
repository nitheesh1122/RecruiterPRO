const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticate = require('../middleware/auth');
const recruiterResumeParser = require('../controllers/recruiterParserController');

const upload = multer({ dest: 'uploads/' });

router.post(
  '/upload-resume',
  authenticate(['recruiter']),
  upload.single('resume'),
  recruiterResumeParser
);

module.exports = router;
