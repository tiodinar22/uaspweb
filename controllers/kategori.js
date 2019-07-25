const Kategori = require('../models/kategori');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports.getAllKategori = (req, res) => {
    Kategori.findAll()
        .then((kategori) => {
            res.status(200).json(kategori);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailKategori = (req, res) => {
    Kategori.findOne({
            where: {
                id: req.params.kategori_id
            }
        })
        .then((kategori) => {
            res.status(200).json(kategori);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeKategori = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                Kategori.create({
                        nama: req.body.nama,
                        keterangan: req.body.keterangan
                    })
                    .then((kategori) => {
                        res.status(200).json({
                            msg: 'Kategori berhasil dibuat!',
                            kategori: kategori
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}

module.exports.updateKategori = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                Kategori.findOne({
                        where: {
                            id: req.params.kategori_id
                        }
                    })
                    .then((kategori) => {
                        if (!kategori) {
                            return res.status(404).json({
                                msg: 'Kategori tidak ditemukan'
                            });
                        }
                        kategori.nama = req.body.nama;
                        kategori.keterangan = req.body.keterangan;
                        kategori.save();

                        return res.status(200).json({
                            msg: 'Kategori berhasil diperbarui!',
                            kategori: kategori
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}


module.exports.destroyKategori = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                Kategori.destroy({
                        where: {
                            id: req.params.kategori_id
                        }
                    })
                    .then((kategori) => {
                        res.status(200).json({
                            msg: 'Kategori dihapus!'
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}

module.exports.searchKategori = (req, res) => {
    Kategori.findAll({
            limit: 10,
            where: {
                nama: sequelize.where(sequelize.fn('LOWER', sequelize.col('nama')), 'LIKE', '%' + req.params.nama + '%')
            }
        })
        .then((kategori) => {
            res.status(200).json({
                msg: 'Hasil pencarian',
                result: kategori
            });
        })
        .catch((error) => {
            console.log(error)
        });
}