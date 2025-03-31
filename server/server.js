const express = require('express');
const cors = require('cors');
const app = express();


// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Allow frontend to access backend

// Import and use routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
