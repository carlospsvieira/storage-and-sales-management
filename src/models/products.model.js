const connection = require('./connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};
const findProductsById = async (productId) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC',
    [productId],
  );
  return products;
};

const createNewProduct = async (newProduct) => {
  await connection.execute(
    'INSERT INTO StoreManager.products (id, name) VALUES (?, ?)',
    [newProduct.id, newProduct.name],
  );
  return newProduct;
};

const updateProuct = async ({ name }, id) => {
  const [result] = await connection.execute(`UPDATE StoreManager.products
    SET name = ? WHERE id = ?`, [name, id]);
  return result;
};

module.exports = {
  findAllProducts,
  findProductsById,
  createNewProduct,
  updateProuct,
};
