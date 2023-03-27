const connection = require('../models/connection');

const validateSaleProductIds = async (sale) => {
  const invalidSaleItems = sale.filter((item) => !item.productId);
  if (invalidSaleItems.length > 0) {
    return { status: 400, message: '"productId" is required' };
  }
};

const validateSaleQuantities = async (sale) => {
  const invalidSaleItems = sale.filter((item) => !item.quantity);
  if (invalidSaleItems.length > 0) {
    return { status: 400, message: '"quantity" is required' };
  }
};

const validateSaleQuantitiesGreaterThanZero = async (sale) => {
  const invalidSaleItems = sale.filter((item) => item.quantity <= 0);
  if (invalidSaleItems.length > 0) {
    return {
      status: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
};

const validateSaleProductIdsExist = async (sale) => {
  const productIds = sale.map((item) => item.productId);
  const [rows] = await connection.execute(
    'SELECT id FROM products WHERE id IN (?)',
    [productIds],
  );

  const existingProductIds = rows.map((row) => row.id);
  const nonExistingProductIds = productIds.filter(
    (id) => !existingProductIds.includes(id),
  );

  if (nonExistingProductIds.length > 0) {
    return { status: 404, message: 'Product not found' };
  }
};

const validateSale = async (sale) => {
  const errors = await Promise.all([
    validateSaleProductIds(sale),
    validateSaleQuantities(sale),
    validateSaleQuantitiesGreaterThanZero(sale),
    validateSaleProductIdsExist(sale),
  ]);

  return errors.filter((error) => error);
};

module.exports = {
  validateSale,
};