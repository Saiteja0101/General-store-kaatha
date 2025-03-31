const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         // PostgreSQL username
  host: 'localhost',     // Running locally
  database: 'store management', // Your database name
  password: 'Saiteja8096@',     // PostgreSQL password
  port: 5432,            // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ Connection error:', err));


module.exports = pool;
