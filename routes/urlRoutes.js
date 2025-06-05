const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  redirectShortUrl,
  getAnalytics,
} = require('../Controllers/urlController');

router.post('/shorten', createShortUrl);
router.get('/analytics/:shortCode', getAnalytics);
router.get('/:shortCode', redirectShortUrl);

module.exports = router;
