const express = require('express');
const db = require('../config/db.js');

const router = express.Router();

router.post('/addcustomer', async (req, res) => {
    try {
        const { user_id, customer_name, phone_no, due_amount } = req.body;

        if (!customer_name || !phone_no || !due_amount) {
            return res.status(400).json({ error: "All fields are mandatory" });
        }

        const query = `
    INSERT INTO owner_customer (user_id, customer_name, phone_no, due_amount, last_updated)
    VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, phone_no)
    DO UPDATE SET 
        due_amount = owner_customer.due_amount + EXCLUDED.due_amount,
        last_updated = CURRENT_TIMESTAMP
    RETURNING *;
`;

        const values = [user_id, customer_name, phone_no, due_amount];


        const result = await db.query(query, values);
        
        res.status(201).json({ message: "Customer added or updated", data: result.rows[0] });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
});

module.exports = router;
