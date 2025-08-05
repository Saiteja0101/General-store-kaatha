const express = require('express');
const remove = require('../controllers/remove.js')
const router = express.Router();


router.delete('/', remove)

module.exports = router;
