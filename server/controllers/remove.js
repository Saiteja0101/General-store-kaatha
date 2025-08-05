const model = require('../models/ownerCustomerModel');

const remove = async (req, res) => {
  try {
    const { user_id, phone_no } = req.body;

    if (!phone_no) {
      return res.status(400).json({
        status: false,
        message: "Phone number is required",
      });
    }

    const removeCustomer = await model.deleteOne({ phoneNo: phone_no, user_id: user_id });

    if (removeCustomer.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "No customer found with the given phone number",
      });
    }

    console.log("Deleted Successfully", removeCustomer);

    return res.status(200).json({
      status: true,
      message: "Deleted successfully",
      data: removeCustomer,
    });

  } catch (err) {
    console.error("Internal server error", err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = remove;
