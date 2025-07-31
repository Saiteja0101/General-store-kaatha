const express = require('express')
const db = require('../config/db.js')
const bcrypt = require('bcryptjs')
const router = express.Router()


router.post('/login', async (req, res) => {
  const { phoneNo, password } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM users WHERE phoneno = $1', [phoneNo]);
    const user = userResult.rows[0];

    if (!user) return res.status(400).json({ message: 'No account found with this phone No' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password incorrect' });

    res.status(200).json({ 
      message: "login successful",
      user: {
                id: user.user_id,
                email: user.phoneNo
            }
    
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router