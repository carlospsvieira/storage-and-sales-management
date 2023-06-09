const salesService = require('../services/sales.services');
const salesModel = require('../models/sales.models');
const { validateSale } = require('../middlewares/validationSale');

// const createNewSale = async (req, res) => {
//   const sale = req.body;
//   try {
//     const newSale = await salesService.createNewSale(sale);
//     return res.status(201).json(newSale);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send('Failed to create sale');
//   }
// };

const createNewSale = async (req, res) => {
  const sale = req.body;
  const errors = await validateSale(sale);
  if (errors.length > 0) {
    return res.status(errors[0].status).json({ message: errors[0].message });
  }

  const newSaleId = await salesModel.newSaleId();
  await Promise.all(
    sale.map((item) =>
      salesModel.insertNewSale({
        id: newSaleId,
        productId: item.productId,
        quantity: item.quantity,
      })),
  );

  return res.status(201).json({ id: newSaleId, itemsSold: sale });
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
