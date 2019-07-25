const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Order extends Sequelize.Model {}

Order.init({
    qty: Sequelize.STRING
}, {
    sequelize,
    modelName: 'order'
});

module.exports = Order;