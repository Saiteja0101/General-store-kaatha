const model = require('../models/userModel.js');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { phoneNo, password } = req.body;

        // Find user by phone number
        const loginUser = await model.findOne({ phoneNo });

        if (!loginUser) {
            return res.status(400).json({
                status: false,
                message: "No account found, create a new account"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, loginUser.password);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: 'Password incorrect'
            });
        }

        return res.status(200).json({
            status: true,
            message: "Login successful",
            data: loginUser._id
        });

    } catch (err) {
        console.error("Internal Server Error", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = login;
