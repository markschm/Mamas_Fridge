const express = require('express');
const app = express();
const pool = require('./db/db')

// consider using Joi for schema's

app.use(express.json());

app.get("/test-get", async (req, res) => {
    console.log("GET request to /test-get");

    const results = await pool.query('SELECT * FROM testtable;');

    res.json({
        users: results['rows']
    });
});

app.put("/test-add", async (req, res) => {
    console.log("PUT request to /test-add");
    
    const username = req.body.user.username;

    pool.query(`INSERT INTO testtable (username) VALUES ('${username}');`, (error, succes) => {
        if (error) {
            console.log("Error inserting");
        }
        
        // would need some error if connection fails
    });

    res.status(200).send();
});

app.get('/test-create', (req, res) => {
    console.log("GET request to /test-create");

    pool.query(`CREATE TABLE IF NOT EXISTS testtable (
        _id serial PRIMARY KEY,
        username VARCHAR (50) UNIQUE NOT NULL
    );`, (error, succes) => {
        if (error) {
            console.log("Error inserting");
        }
        
        // would need some error if connection fails
    });

    res.status(200).send();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});