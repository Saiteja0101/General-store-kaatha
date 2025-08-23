const express = require('express')
const newUser = require('../controllers/register.js')

const router = express.Router()

router.post('/', newUser)

module.exports = router