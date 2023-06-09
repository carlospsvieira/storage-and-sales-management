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

const createNewProduct = async (item) => {
  const newProduct = await productsModel.createNewProduct(item);
  return newProduct;
};

const updateProduct = async (id, name) => {
  const product = await productsModel.findProductsById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  await productsModel.updateProuct({ name }, id);
  return { id, name };
};

module.exports = {
  findAllProducts,
  findProductsById,
  createNewProduct,
  updateProduct,
};
