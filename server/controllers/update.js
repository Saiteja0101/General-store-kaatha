const model = require('../models/ownerCustomerModel');

const update = async (req, res) => {
  try {
    const { phone_no, addorSub, due_amount, user_id } = req.body;

    if (!phone_no || !due_amount || !addorSub) {
      return res.status(400).json({
        status: false,
        message: "All fields are mandatory",
      });
    }

    // Find the customer by phone number and user_id
    const customer = await model.findOne({ phoneNo: phone_no, user_id: user_id });
    console.log(customer);
    
    if (!customer) {
      return res.status(404).json({
        status: false,
        message: "User not found to update due amount",
      });
    }
    const amount = parseFloat(due_amount)
    // Add or subtract due amount based on addorSub
    customer.dueAmount = addorSub === '-SUB' ? customer.dueAmount -= amount : customer.dueAmount += amount
    if(customer.dueAmount < 0) customer.dueAmount = 0
    customer.lastUpdated = new Date().toLocaleString();

    await customer.save();

    return res.status(200).json({
      status: true,
      message: "Updated due amount successfully",
      data: customer,
    });

  } catch (err) {
    console.error("Internal server error", err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = update;
