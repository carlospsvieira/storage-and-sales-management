const salesModel = require('../models/sales.models');

const createNewSale = async (sale) => {
  // Create a new sale record and get the sale ID
  const saleId = await salesModel.newSaleId();

  // Insert each item sold into the sales_products table
  const itemsSold = await Promise.all(
    sale.map(async (item) => {
      const { productId, quantity } = item;
      await salesModel.insertNewSale({ id: saleId, productId, quantity });
      return { productId, quantity };
    }),
  );

  // Return the new sale object
  return { id: saleId, itemsSold };
};

const findAllSales = async () => {
  const result = await salesModel.findAllSales();
  return result;
};

const findSalesById = async (saleId) => {
  const result = await salesModel.findSalesById(saleId);
  return result;
};

module.exports = {
  createNewSale,
  findAllSales,
  findSalesById,
};
