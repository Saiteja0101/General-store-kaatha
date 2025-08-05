const express = require('express')
const router = express.Router()
const add  = require('../controllers/add.js')


router.post('/', add)

module.exports = router