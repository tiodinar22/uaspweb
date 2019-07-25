const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const kategoriController = require('../controllers/kategori');

const auth = require('../configs/auth');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', kategoriController.getAllKategori);

router.get('/:kategori_id', kategoriController.getDetailKategori);

router.post('/', urlencodedParser, auth.verifyToken, kategoriController.storeKategori);

router.put('/:kategori_id', urlencodedParser, auth.verifyToken, kategoriController.updateKategori);

router.delete('/:kategori_id/destroy', urlencodedParser, auth.verifyToken, kategoriController.destroyKategori);

router.post('/search/:nama', urlencodedParser, kategoriController.searchKategori);

module.exports = router;