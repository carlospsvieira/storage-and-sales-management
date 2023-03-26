const salesModel = require('../models/sales.models');

const createNewSale = async (sale) => {
  const id = await salesModel.newSaleId();

  const newSale = { id, itemsSold: sale };
  
  return newSale;
};

module.exports = {
  createNewSale,
};