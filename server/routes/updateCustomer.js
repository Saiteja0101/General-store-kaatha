const express = require('express');
const db = require('../config/db.js');

const router = express.Router();

router.put('/updatecustomer', async (req, res) => {
    try {
        const {phone_no, addorSub, due_amount, user_id } = req.body;
        const date = new Date()

        const query = addorSub === "-SUB"
            ? `UPDATE owner_customer SET due_amount = due_amount - $2, last_updated = $3 WHERE phone_no = $1 AND user_id = $4`
            : `UPDATE owner_customer SET due_amount = due_amount + $2, last_updated = $3 WHERE phone_no = $1 AND user_id = $4`;


        if (!phone_no || !due_amount) {
            return res.status(400).json({ error: "Phone number and due amount are required" });
        }
        const values = [phone_no, parseFloat(due_amount), date, user_id];

        const result = await db.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Successfully updated" });

    } catch (error) {
        console.error("Update error:", error.message);
        res.status(500).json({ message: "Failed to update" });
    }
});

module.exports = router;
