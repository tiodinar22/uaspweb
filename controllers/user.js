const User = require('../models/user');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.getAllUser = (req, res) => {
    User.findAll()
        .then((user) => {
            res.status(200).json({
                data: user
            });
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailUser = (req, res) => {
    User.findOne({
            where: {
                id: req.params.user_id
            }
        })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeUser = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                User.findOrCreate({
                        where: {
                            email: req.body.email
                        },
                        defaults: {
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            role: req.body.role
                        }
                    })
                    .then((user) => {
                        res.status(201).json({
                            msg: 'User dibuat',
                            user: user
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda tidak memiliki akses sebagai admin!'
                });
            }
        }
    })

}

module.exports.updateUser = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                User.findOne({
                        where: {
                            id: req.params.user_id
                        }
                    })
                    .then((user) => {
                        if (!user) {
                            return res.status(404).json({
                                msg: 'User tidak ditemukan'
                            });
                        }
                        user.username = req.body.username;
                        user.email = req.body.email;
                        user.password = req.body.password;
                        user.role = req.body.role;
                        user.save();

                        return res.status(200).json({
                            msg: 'User diubah',
                            user: user
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda tidak memiliki akses sebagai admin!'
                });
            }
        }
    })
}


module.exports.destroyUser = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                User.destroy({
                        where: {
                            id: req.params.user_id
                        }
                    })
                    .then((user) => {
                        res.status(200).json({
                            msg: 'User dihapus'
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda tidak memiliki akses sebagai admin!'
                });
            }
        }
    })
}

module.exports.searchUser = (req, res) => {
    User.findAll({
            limit: 10,
            where: {
                username: sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), 'LIKE', '%' + req.params.username + '%')
            }
        })
        .then((user) => {
            res.status(200).json({
                msg: 'Hasil pencarian',
                result: user
            });
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.loginUser = (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then((user) => {
            if (!user) {
                res.status(400).json({
                    msg: "Username tidak ditemukan!"
                })
            }
            bcrypt.compare(req.body.password, user.get('password'), function (err, isMatch) {
                if (err) {
                    res.status(400).json({
                        msg: "Something Wrong, Mention your vendor!"
                    })
                }

                if (isMatch) {
                    // Signing a token with 1 hour
                    jwt.sign({
                        id: user.get('id'),
                        admin: user.get('role')
                    }, process.env.SECRETKEY, (err, token) => {
                        if (token) {
                            res.status(200).json({
                                msg: 'Login Success',
                                token: token
                            });
                        } else {
                            res.status(200).json({
                                msg: 'There is something wrong with your token!'
                            });
                        }
                    });
                } else {
                    res.status(400).json({
                        msg: "Password tidak sesuai!"
                    })
                }
            });
        })
        .catch((error) => {
            console.log(error)
        });
}