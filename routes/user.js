const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const userController = require('../controllers/user');

const auth = require('../configs/auth');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', userController.getAllUser);

router.get('/:user_id', userController.getDetailUser);

router.post('/register', urlencodedParser, auth.verifyToken, userController.storeUser); // only role = 1 can access (admin)

router.put('/:user_id', urlencodedParser, auth.verifyToken, userController.updateUser); // only role = 1 can access (admin)

router.delete('/:user_id/destroy', urlencodedParser, auth.verifyToken, userController.destroyUser); // only role = 1 can access (admin)

router.post('/search/:username', urlencodedParser, userController.searchUser);

router.post('/login', urlencodedParser, userController.loginUser);

module.exports = router;