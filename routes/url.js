const express = require('express');
const router = express.Router();
const controller = require('../controller/url');

router.post('/shorten', controller.postUrl);
router.get('/:shortCode', controller.getUrl);

module.exports = router;