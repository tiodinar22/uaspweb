const express = require('express');

const app = express();

const userRouter = require('./routes/user');
const kategoriRouter = require('./routes/kategori');

const sequelize = require('./configs/sequelize');

const User = require('./models/user');
const Kategori = require('./models/kategori');

app.use('/user', userRouter);
app.use('/kategori', kategoriRouter);

app.listen(8005, () => {
    console.log('server started');
    sequelize.sync();
})