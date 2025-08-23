const Customer = require('../models/customerModel')
const OwnerCustomer = require('../../models/ownerCustomerModel')
const Users = require('../../models/userModel')

const viewdues = async (req, res) => {
  try {
    const { customer_id } = req.query

    if (!customer_id) {
      return res.status(400).json({
        status: false,
        message: "customer id is required",
      })
    }

    // 1. Find customer by ID
    const customer = await Customer.findById(customer_id)
    if (!customer) {
      return res.status(404).json({
        status: false,
        message: "Customer not found",
      })
    }

    // 2. Find dues across all owners by phone number
    const dues = await OwnerCustomer.find({ phoneNo: customer.phoneNo })

    if (!dues || dues.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No dues found",
        data: []
      })
    }

    // 3. Enrich with store name
    const results = []
    for (const due of dues) {
      const store = await Users.findById(due.user_id) 
      results.push({
        storeName: store ? store.storeName : 'Unknown Name',
        dueAmount: due.dueAmount,
        lastUpdated: due.lastUpdated,
      })
    }

    return res.status(200).json({
      status: true,
      message: "Data retrieved",
      data: results
    })

  } catch (error) {
    console.error("Internal server error", error.message)
    return res.status(500).json({
      status: false,
      message: error.message || "Internal server error"
    })
  }
}

module.exports = viewdues
