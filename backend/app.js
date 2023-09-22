const express = require('express');
const app = express();

const fridgeRouter = require('./routes/fridgeRoutes');

// consider using Joi for schema's
app.use(express.json());

app.use('/fridge', fridgeRouter);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});