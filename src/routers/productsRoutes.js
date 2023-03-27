const express = require('express');
const productsController = require('../controllers/products.controllers');
const { validateName } = require('../middlewares/validationProducts');

const router = express.Router();

router
  .get('/', productsController.findAllProducts)
  .post('/', validateName, productsController.createNewProduct)
  .get('/:id', productsController.findProductsById);
  // .put('/:id', productsController.updateProuct);

module.exports = router;