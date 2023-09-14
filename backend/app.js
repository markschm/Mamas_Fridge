const express = require('express');
const app = express();

// consider using Joi for schema's

app.get("/test", (req, res) => {
    console.log("GET request to /test");

    res.send({
        name: "Mark",
        age: 20
    });
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});