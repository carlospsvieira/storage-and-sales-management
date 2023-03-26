const connection = require('./connection');

const newSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

module.exports = {
  newSaleId,
};
