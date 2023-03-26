const Joi = require('joi');

const schemaName = Joi.string().min(5).max(50).required();

module.exports = {
  schemaName,
};
