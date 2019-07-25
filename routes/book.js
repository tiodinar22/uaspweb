const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const bookController = require('../controllers/book');

const auth = require('../configs/auth');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', bookController.getAllBook);
router.get('/:book_id', bookController.getDetailBook);
router.post('/', urlencodedParser, auth.verifyToken, bookController.storeBook);
router.put('/:book_id', urlencodedParser, auth.verifyToken, bookController.updateBook);
router.delete('/:book_id/destroy', urlencodedParser, auth.verifyToken, bookController.destroyBook);
router.post('/search/:nama', urlencodedParser, bookController.searchBook);

module.exports = router;