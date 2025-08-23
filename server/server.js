const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connection = require('./config/db.js')
dotenv.config()

// owner operations
const addCustomerRoute = require('./routes/addCustomer.js')
const removeCustomerRoute = require('./routes/removeCustomer.js')
const updateDueRoute = require('./routes/updateCustomer.js')
const viewDuesRoute = require('./routes/fetchDues.js')
const dashboardRoute = require('./routes/dashboard.js')
// owner authentication 
const login = require('./routes/login.js')
const register = require('./routes/register.js')

// customer authentication
const customerLogin = require('./customer_Server/routes/login.js')
const customerRegister = require('./customer_Server/routes/register.js')

// customer operations
const customerDashboardRoute = require('./customer_Server/routes/dashboard.js')
const customerCheckDuesRoute = require('./customer_Server/routes/viewdues.js')

const app = express()
const PORT = process.env.PORT || 5001

// middleware
app.use(cors())
app.use(express.json())


// server checking
app.get('/', (req, res) =>{
    res.send("server running...")
})

//owner auth Route
app.use('/auth/register', register)
app.use('/auth/login', login)

// owner Route
app.use('/owner/addcustomer', addCustomerRoute)
app.use('/owner/removecustomer', removeCustomerRoute)
app.use('/owner/updatedues', updateDueRoute)
app.use('/owner/viewdues', viewDuesRoute)
app.use('/owner/dashboard', dashboardRoute)


// customer operations
app.use('/customer/login', customerLogin)
app.use('/customer/register', customerRegister)
app.use('/customer/dashboard', customerDashboardRoute)
app.use('/customer/viewdues', customerCheckDuesRoute)

app.listen(PORT, async () => {
    try {
        await connection()
        console.log(`Server running on ${PORT}`)
    } catch (err) {
        console.error("Failed to connect to the database: ", err.message)
        process.exit(1)
    }
    
})