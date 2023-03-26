const Joi = require('joi');

const schemaName = Joi.string().min(5).max(50).required();
const schemaQuantity = Joi.number().min(1).required();

module.exports = {
  schemaName,
  schemaQuantity,
};
