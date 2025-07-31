const express = require('express');
const db = require('../config/db.js');

const router = express.Router();

router.get('/dashboard', async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ message: "Missing user_id" });
    }

    try {
        const result = await db.query('SELECT storename FROM users WHERE user_id = $1', [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(result.rows[0].storename); // ✅ sending just the name
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
