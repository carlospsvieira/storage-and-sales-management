const salesService = require('../services/sales.services');

const createNewSale = async (req, res) => {
  const sale = req.body;
  if (sale) {
    const newSale = await salesService.createNewSale(sale);
    return res.status(201).json(newSale);
  }
};

module.exports = {
  createNewSale,
};

// [
//   {
//     productId: 1,
//     quantity: 1,
//   },
//   {
//     productId: 2,
//     quantity: 5,
//   },
// ];

// {
//   "id": 3,
//   "itemsSold": [
//     {
//       "productId": 1,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "quantity": 5
//     }
//   ]
// }