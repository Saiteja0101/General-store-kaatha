const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

const connectToDB = async () => {
    try {
        await pool.connect()
        console.log("DB connected");
        
    } catch (err) {
        console.log("error: ", err)
    }
}
connectToDB()

module.exports = pool