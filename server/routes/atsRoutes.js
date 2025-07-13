const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticate = require('../middleware/auth');
const { analyzeResume } = require('../controllers/atsController');

const upload = multer({ dest: 'uploads/' });

router.post('/analyze', authenticate(['user']), upload.single('resume'), analyzeResume);

module.exports = router;
