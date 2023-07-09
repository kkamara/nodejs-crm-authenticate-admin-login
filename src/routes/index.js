const express = require('express');
const home = require('./home');
const api = require('./api');

const router = express.Router();

router.use('/', home);
router.use('/', api);

module.exports = router;