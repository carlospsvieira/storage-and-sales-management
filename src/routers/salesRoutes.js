const express = require('express');
const salesController = require('../controllers/sales.controllers');
// const {
//   checkForProductIdAndQuantity,
//   quantityGreaterThanZero,
// } = require('../middlewares/validationSale');

const router = express.Router();

router
  .get('/', salesController.findAllSales)
  .get('/:id', salesController.findSalesById)
  .post(
    '/',
    // checkForProductIdAndQuantity,
    // quantityGreaterThanZero,
    salesController.createNewSale,
  );

module.exports = router;
