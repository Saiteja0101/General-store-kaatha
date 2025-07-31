const express = require('express')
const fetchDues = require('./routes/fetchDues.js')
const addcustomer = require('./routes/addCustomer.js')
const updateCustomer = require('./routes/updateCustomer.js')
const removeCustomer = require('./routes/removeCustomer.js')
const dashboard = require('./routes/dashboard.js')

const router = express.Router()

router.use('/', fetchDues)
router.use('/', addcustomer)
router.use('/', updateCustomer)
router.use('/', removeCustomer)
router.use('/', dashboard)

module.exports = router