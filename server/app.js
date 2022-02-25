const express = require('express');
const app = express();
require('express-async-errors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const cors = require('cors');
const mongoose = require('./db/connect')

const authenticationRouter = require('./routes/authentication');
const registrationRouter = require('./routes/registration');
const todoListRouter = require('./routes/todo-list');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(cors());

app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1", authenticationRouter);
app.use("/api/v1", registrationRouter);
app.use("/api/v1", todoListRouter);

app.use(cors);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.BACKEND_SERVICE_PORT || 5000;
const start = async() => {
    try {
        await mongoose.connectDB();
        app.listen(port, () => {
                console.log(`Server is now listening on port ${port}`);
            }
        );
    } catch (error) {
        console.log(error);
    }
}

start();
