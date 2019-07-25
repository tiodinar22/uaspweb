const express = require('express');

const app = express();

const userRouter = require('./routes/user');
const kategoriRouter = require('./routes/kategori');
const bookRouter = require('./routes/book');

const sequelize = require('./configs/sequelize');

const User = require('./models/user');
const Kategori = require('./models/kategori');
const Book = require('./models/book');

Book.belongsTo(Kategori)

app.use('/user', userRouter);
app.use('/kategori', kategoriRouter);
app.use('/book', bookRouter);


app.listen(8005, () => {
    console.log('server started');
    sequelize.sync();
})