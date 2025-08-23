const express = require('express')
const viewdues = require('../controllers/viewdues.js')

const router = express.Router()

router.get('/', viewdues)

module.exports = router