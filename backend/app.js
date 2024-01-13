import { fridgeRouter } from './routes/fridgeRoutes.js';
import express from 'express';
const app = express();



app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// routers
app.use('/fridge', fridgeRouter);


// start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
