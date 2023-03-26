const express = require('express');
const salesController = require('../controllers/sales.controllers');

const router = express.Router();

router.post('/', salesController.createNewSale);

module.exports = router;
