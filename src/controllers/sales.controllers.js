const salesService = require('../services/sales.services');

const createNewSale = async (req, res) => {
  const sale = req.body;
  try {
    const newSale = await salesService.createNewSale(sale);
    return res.status(201).json(newSale);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewSale,
};