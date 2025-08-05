const model = require('../models/userModel');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { username, email, phoneNo, password, storename } = req.body;

        if (!username || !isNaN(phoneNo) || !password || !storename) {
            return res.status(400).json({
                status: false,
                message: "All fields are mandatory, Enter valid details",
            });
        }

        const existingUser = await model.findOne({ phoneNo });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await model.create({
            name: username,
            storeName: storename,
            phoneNo,
            email,
            password: hashedPassword,
        });

        if (!newUser) {
            return res.status(400).json({
                status: false,
                message: "Failed to register",
            });
        }

        console.log("Register Successful:", newUser);

        return res.status(200).json({
            status: true,
            message: "Register successful",
            data: newUser
        });

    } catch (err) {
        console.error("Internal server error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

module.exports = register;
