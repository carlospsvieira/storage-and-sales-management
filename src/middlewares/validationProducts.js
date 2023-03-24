const schema = require('./schema');

const validateName = (req, res, next) => {
  const { name } = req.body;
  const { error } = schema.schemaName.validate(name);
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (error) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  validateName,
};
