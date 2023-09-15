const express = require('express');
const app = express();
const pool = require('./db/db')

// consider using Joi for schema's

app.get("/test", async (req, res) => {
    console.log("GET request to /test");

    const results = await pool.query('SELECT * FROM testtable;');

    res.json({
        users: results['rows']
    });
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});