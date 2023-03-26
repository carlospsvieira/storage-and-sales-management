const checkForProductIdAndQuantity = (req, res, next) => {
  const sale = req.body;
  if (sale.some((item) => !item.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (sale.some((item) => !item.quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const quantityGreaterThanZero = async (req, res, next) => {
  const sale = req.body;

  if (sale.some((item) => item.quantity <= 0)) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  checkForProductIdAndQuantity,
  quantityGreaterThanZero,
};
