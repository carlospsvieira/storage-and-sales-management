const productsModel = require('../models/products.model');

const findAllProducts = async () => {
  const result = await productsModel.findAllProducts();
  return result;
};

const findProductsById = async (productId) => {
  const products = await productsModel.findProductsById(productId);
  if (!products) {
    return { error: { message: 'Product not found' } };
  }
  return products;
};

module.exports = {
  findAllProducts,
  findProductsById,
};
