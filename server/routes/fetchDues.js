const express = require('express')
const viewDues = require('../controllers/viewDues.js')
const router = express.Router()

router.get('/', viewDues)

module.exports = router