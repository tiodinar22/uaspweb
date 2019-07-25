const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:s3cret@localhost:3306/uas_bintang_tio');

module.exports = sequelize;