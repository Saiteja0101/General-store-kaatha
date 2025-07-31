const express = require('express');
const db = require('../config/db.js');

const router = express.Router();

router.delete('/removecustomer', async (req, res) => {
    try {
        const { phone_no, user_id } = req.body;

        if (!phone_no || !user_id) {
            return res.status(400).json({ message: "Phone number and user ID are required" });
        }

        // Check if customer exists for this specific user
        const checkQuery = `SELECT * FROM owner_customer WHERE phone_no = $1 AND user_id = $2`;
        const checkResult = await db.query(checkQuery, [phone_no, user_id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ message: "Customer not found for this user" });
        }

        //Delete only that customer's record for the given user
        const deleteQuery = `DELETE FROM owner_customer WHERE phone_no = $1 AND user_id = $2`;
        await db.query(deleteQuery, [phone_no, user_id]);

        res.status(200).json({ message: "Customer removed successfully" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
