const productsService = require('../services/products.services');

const findAllProducts = async (_req, res, next) => {
  try {
    const result = await productsService.findAllProducts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const findProductsById = async (req, res) => {
  const { id } = req.params;
  const products = await productsService.findProductsById(id);
  if (products.error) {
    return res.status(404).json(products.error);
  }
  return res.status(200).json(products);
};

module.exports = {
  findAllProducts,
  findProductsById,
};
