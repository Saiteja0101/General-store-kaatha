const express = require('express')
const registerNewUser = require('../controllers/register.js')

const router = express.Router()

router.post('/', registerNewUser)

module.exports = router