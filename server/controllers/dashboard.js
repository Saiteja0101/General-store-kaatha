const model = require('../models/userModel');

const dashboard = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required"
      });
    }

    const storeTitle = await model.findById(user_id); // or findOne({ _id: user_id })

    if (!storeTitle) {
      return res.status(404).json({
        status: false,
        message: "Store name not found"
      });
    }

    return res.status(200).json({
      status: true,
      message: "Store name fetched successfully",
      data: storeTitle.storeName
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
