const express = require('express');
const { findAllProducts, findProductsById } = require('../models/products.model');

const router = express.Router();

router
  .get('/', async (_req, res) => {
    const result = await findAllProducts();
    res.status(200).json(result);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const products = await findProductsById(id);
    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(products);
  });

module.exports = router;