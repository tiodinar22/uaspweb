const express = require('express');

const app = express();

const userRouter = require('./routes/user');
const kategoriRouter = require('./routes/kategori');
const bookRouter = require('./routes/book');
const orderRouter = require('./routes/order');

const sequelize = require('./configs/sequelize');

const User = require('./models/user');
const Kategori = require('./models/kategori');
const Book = require('./models/book');
const Order = require('./models/order');

Book.belongsTo(Kategori)
Order.belongsTo(Book)

app.use('/user', userRouter);
app.use('/kategori', kategoriRouter);
app.use('/book', bookRouter);
app.use('/order', orderRouter);


app.listen(8005, () => {
    console.log('server started');
    sequelize.sync();
})