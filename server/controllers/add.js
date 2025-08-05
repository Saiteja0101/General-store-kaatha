const model = require('../models/ownerCustomerModel');

const add = async (req, res) => {
    try {
        const { user_id, customer_name, phone_no, due_amount } = req.body;

        if (!customer_name || !due_amount || !phone_no) {
            return res.status(400).json({
                status: false,
                message: "All fields are mandatory",
            });
        }

        const amount = parseFloat(due_amount);
        if (isNaN(amount)) {
            return res.status(400).json({
                status: false,
                message: "Due amount must be a valid number",
            });
        }

        // check for duplicates
        const existing = await model.findOne({ user_id, phoneNo: phone_no });
        if (existing) {
            return res.status(400).json({
                status: false,
                message: "Customer with this phone number already exists",
            });
        }

        const newCustomer = new model({
            user_id,
            customerName: customer_name,
            phoneNo: phone_no,
            dueAmount: amount,
        });

        const addedCustomer = await newCustomer.save();
        if (!addedCustomer) {
            return res.status(400).json({
                status: false,
                message: "Failed to add customer",
            });
        }

        console.log("Added successfully ", addedCustomer);

        return res.status(200).json({
            status: true,
            message: "Added successfully",
            data: addedCustomer,
        });

    } catch (err) {
        console.error("Internal Server Error ", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

module.exports = add;
