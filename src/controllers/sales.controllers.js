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

const findAllSales = async (_req, res) => {
  const list = await salesService.findAllSales();
  if (!list) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(list);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  const saleId = await salesService.findSalesById(id);
  if (!id || !saleId.length) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(saleId);
};

module.exports = {
  createNewSale,
  findAllSales,
  findSalesById,
};