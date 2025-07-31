const express = require('express')
const cors = require('cors')
const ownerRoutes = require('./ownerRoutes.js')
const authRoutes = require('./authRoutes.js')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

// middleware
app.use(cors())
app.use(express.json())


// server checking
app.get('/', (req, res) =>{
    res.send("server running...")
})

// auth Route
app.use('/auth', authRoutes)

// owner Route
app.use('/', ownerRoutes)


app.listen(PORT, () => {
    console.log("Server running on PORT: ", PORT);
    
})