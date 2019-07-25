const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Buku extends Sequelize.Model {}

Buku.init({
    nama: Sequelize.STRING,
    harga: Sequelize.INTEGER,
    kategoriId: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'buku'
});

module.exports = Buku;