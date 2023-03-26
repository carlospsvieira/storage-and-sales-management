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

module.exports = {
  createNewSale,
};