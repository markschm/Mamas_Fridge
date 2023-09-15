const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432
});

module.exports = pool;