const Book = require('../models/book');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports.getAllBook = (req, res) => {
    Book.findAll()
        .then((book) => {
            res.status(200).json(book);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailBook = (req, res) => {
    Book.findOne({
            where: {
                id: req.params.book_id
            }
        })
        .then((book) => {
            res.status(200).json(book);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) {
                Book.create({
                        nama: req.body.nama,
                        harga: req.body.harga,
                        kategoriId: req.body.kategoriId
                    })
                    .then((book) => {
                        res.status(200).json({
                            msg: 'Book Created',
                            book: book
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}

module.exports.updateBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) {
                Book.findOne({
                        where: {
                            id: req.params.book_id
                        }
                    })
                    .then((book) => {
                        if (!book) {
                            return res.status(404).json({
                                msg: 'Book Not Found'
                            });
                        }
                        book.nama = req.body.nama;
                        book.harga = req.body.harga;
                        book.kategoriId = req.body.kategoriId;
                        book.save();

                        return res.status(200).json({
                            msg: 'Book Updated',
                            book: book
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}


module.exports.destroyBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) {
                Book.destroy({
                        where: {
                            id: req.params.book_id
                        }
                    })
                    .then((book) => {
                        res.status(200).json({
                            msg: 'Book Deleted'
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}

module.exports.searchBook = (req, res) => {
    Book.findAll({
            limit: 10,
            where: {
                nama: sequelize.where(sequelize.fn('LOWER', sequelize.col('nama')), 'LIKE', '%' + req.params.nama + '%')
            }
        })
        .then((book) => {
            res.status(200).json({
                msg: 'search results',
                result: book
            });
        })
        .catch((error) => {
            console.log(error)
        });
}