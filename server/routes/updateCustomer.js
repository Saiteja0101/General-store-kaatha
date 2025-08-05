const express = require('express');
const router = express.Router()
const update = require('../controllers/update.js')

router.put('/', update)

module.exports = router;
