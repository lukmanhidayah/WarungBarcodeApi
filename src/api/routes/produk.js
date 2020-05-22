const express = require('express');
const router = express.Router();

const produk = require('../controllers/produk')

router.get('/', produk.get_all_produk)


module.exports = router