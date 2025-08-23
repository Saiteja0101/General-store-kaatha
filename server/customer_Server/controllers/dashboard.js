const model = require('../models/customerModel');

const dashboard = async (req, res) => {
  try {
    const { customer_id } = req.query;

    if (!customer_id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required"
      });
    }

    const getUsername = await model.findById(customer_id); // or findOne({ _id: customer_id })

    if (!getUsername) {
      return res.status(404).json({
        status: false,
        message: "User name not found"
      });
    }    
    return res.status(200).json({
      status: true,
      message: "User name fetched successfully",
      data: getUsername.userName
    });

  } catch (err) {
    console.error("Internal server error:", err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

module.exports = dashboard;
