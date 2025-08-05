const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connection = require('./config/db.js')
dotenv.config()

const addCustomerRoute = require('./routes/addCustomer.js')
const removeCustomerRoute = require('./routes/removeCustomer.js')
const updateDueRoute = require('./routes/updateCustomer.js')
const viewDuesRoute = require('./routes/fetchDues.js')
const dashboardRoute = require('./routes/dashboard.js')
// authentication routes
const login = require('./routes/login.js')
const register = require('./routes/register.js')


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
app.use('/auth/register', register)
app.use('/auth/login', login)

// owner Route
app.use('/owner/addcustomer', addCustomerRoute)
app.use('/owner/removecustomer', removeCustomerRoute)
app.use('/owner/updatedues', updateDueRoute)
app.use('/owner/viewdues', viewDuesRoute)
app.use('/owner/dashboard', dashboardRoute)


app.listen(PORT, async () => {
    try {
        await connection()
        console.log(`Server running on ${PORT}`)
    } catch (err) {
        console.error("Failed to connect to the database: ", err.message)
        process.exit(1)
    }
    
})