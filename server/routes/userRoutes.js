const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const authenticate = require('../middleware/auth');
const {
  getJobs,
  applyJob,
  uploadResume, // ✅ make sure this is imported
} = require('../controllers/userController');

router.get('/jobs', authenticate(['user']), getJobs);
router.post('/apply', authenticate(['user']), applyJob);
router.post('/upload-resume', authenticate(['user']), upload.single('resume'), uploadResume);

module.exports = router;
