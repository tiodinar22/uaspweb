const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const orderController = require('../controllers/order');

const auth = require('../configs/auth');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', orderController.getAllOrder);
router.get('/:order_id', orderController.getDetailOrder);
router.post('/', urlencodedParser, auth.verifyToken, orderController.storeOrder);
router.put('/:order_id', urlencodedParser, auth.verifyToken, orderController.updateOrder);
router.delete('/:order_id/destroy', urlencodedParser, auth.verifyToken, orderController.destroyOrder);

module.exports = router;