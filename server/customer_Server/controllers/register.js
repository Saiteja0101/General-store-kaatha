const model = require('../models/customerModel');
const bcrypt = require('bcryptjs');

const register = async(req, res) => {
    try {
        const {username, email, phoneNo, password} = req.body;

        if (!username || !phoneNo || !password || !email) {
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
            userName: username,
            phoneNo,
            email_id: email,
            password: hashedPassword,
        });

        if (!newUser) {
            return res.status(400).json({
                status: false,
                message: "Failed to register",
            });
        }

        console.log("Register Successful:", newUser);

        // this is for token verification
        const loginUser = await model.findOne({ phoneNo });
        
        return res.status(200).json({
            status: true,
            message: "Register successful",
            data: loginUser._id.toString()
        });
    } catch (err) {
        console.error("Internal server error: ", err.message)
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
}

module.exports = register;