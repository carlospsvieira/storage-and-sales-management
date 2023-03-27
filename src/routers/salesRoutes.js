const express = require('express');
const salesController = require('../controllers/sales.controllers');

const router = express.Router();

router
  .get('/', salesController.findAllSales)
  .get('/:id', salesController.findSalesById)
  .post('/', salesController.createNewSale);

module.exports = router;
