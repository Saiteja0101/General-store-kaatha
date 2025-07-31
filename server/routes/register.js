const express = require('express')
const db = require('../config/db.js')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()

const router = express.Router()

router.post('/register', async(req, res) => {
    try {
        const {username, email, phoneNo, password, storename} = req.body

        // if all fields are empty
        if(!username || !phoneNo || !password || !storename){
            return res.status(400).json({Error: "All Fields are Mandatory"})
        }

        // check if user exist
        const userCheck = await db.query(`SELECT *FROM users WHERE phoneno = $1`, [phoneNo])
        if(userCheck.rows.length > 0){
            return res.status(400).json({message:"User already exists"})
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = db.query(`INSERT INTO users(username, email, phoneno, password, storename) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [username, email, phoneNo, hashedPassword, storename])
        const newUser = result.rows[0]; 
        res.status(201).json({
            result,
            user: newUser
        })
    } catch (err) {
        res.status(500).json({message: "server error", error: err.message})
    }
})

module.exports = router