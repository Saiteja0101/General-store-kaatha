const express = require('express');
const storeTitle = require('../controllers/dashboard.js')

const router = express.Router();

router.get('/', storeTitle)

module.exports = router;
