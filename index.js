const express = require('express');

const app = express();

const userRouter = require('./routes/user');

const sequelize = require('./configs/sequelize');

const User = require('./models/user');

app.use('/user', userRouter);

app.listen(8005, () => {
    console.log('server started');
    sequelize.sync();
})