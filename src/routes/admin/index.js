'use strict';
const express = require('express');
const home = require('./home');
const auth = require('./auth');

const router = express.Router();

router.use('/', home);
router.use('/auth', auth);

module.exports = router;