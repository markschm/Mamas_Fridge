const express = require('express');
const app = express();

// consider using Joi for schema's

app.get("/test", (req, res) => {
    res.send({
        name: "Mark",
        age: 20
    });
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});