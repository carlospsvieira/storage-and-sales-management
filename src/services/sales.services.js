const salesModel = require('../models/sales.models');

const createNewSale = async (sale) => {
  const id = await salesModel.newSaleId();

  const products = sale.map(async ({ quantity, productId }) => salesModel.insertNewSale(
    {
      id,
      productId,
      quantity,
    },
  ));
  Promise.all(products);
  const newSale = { id, itemsSold: sale };
  
  return newSale;
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