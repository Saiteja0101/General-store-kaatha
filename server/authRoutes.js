const express = require('express')
const register = require('./routes/register.js')
const login = require('./routes/login.js')

const router = express.Router()

router.use('/', register)
router.use('/', login)

module.exports = router