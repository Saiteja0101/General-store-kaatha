const express = require('express')
const db = require('../config/db.js')

const router = express.Router()

router.get('/viewdues', async (req, res) => {
    try {
        const user_id = req.query.user_id; // ✅ read from query param

        if (!user_id) {
            return res.status(400).json({ message: "Missing user_id" });
        }

        const query = await db.query(
            `SELECT * FROM owner_customer WHERE user_id = $1`,
            [user_id]
        );

        res.json(query.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router