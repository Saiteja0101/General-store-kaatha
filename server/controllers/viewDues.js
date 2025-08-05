const model = require('../models/ownerCustomerModel')
const mongoose = require('mongoose')

const viewDues = async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({
                status: false,
                message: "Invalid user ID",
            });
        }

        const dues = await model.find({ user_id });
        // console.log(dues)

        return res.status(200).json({
            status: true,
            message: dues.length > 0 ? "Data retrieved" : "No dues found",
            data: dues,
        });
    } catch (err) {
        console.error("Internal server error", err.message);
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

module.exports = viewDues