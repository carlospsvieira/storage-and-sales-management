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
  const products = await productsService.findProductsById(Number(id));
  if (products.error) {
    return res.status(404).json(products.error);
  }
  return res.status(200).json(products);
};

const createNewProduct = async (req, res) => {
  const { name } = req.body;
  const currentList = await productsService.findAllProducts();
  const id = currentList.length + 1;
  const newProduct = { id, name };
  await productsService.createNewProduct(newProduct);
  return res.status(201).json(newProduct);
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedProduct = await productsService.updateProduct(id, name);
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.message === 'Product not found') {
      res.status(404).json({ message: 'Product not found' });
    } else {
      next(error);
    }
  }
};

module.exports = {
  findAllProducts,
  findProductsById,
  createNewProduct,
  updateProduct,
};
