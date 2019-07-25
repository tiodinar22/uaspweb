const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class User extends Sequelize.Model {}

User.init({
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User;