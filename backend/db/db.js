import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
