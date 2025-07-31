const express = require('express')
const fetchData = require('./routes/fetchData.js')
const addcustomer = require('./routes/addCustomer.js')
const updateCustomer = require('./routes/updateCustomer.js')
const removeCustomer = require('./routes/removeCustomer.js')
const dashboard = require('./routes/dashboard.js')

const router = express.Router()

router.use('/', fetchData)
router.use('/', addcustomer)
router.use('/', updateCustomer)
router.use('/', removeCustomer)
router.use('/', dashboard)

module.exports = router