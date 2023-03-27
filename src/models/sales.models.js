const connection = require('./connection');

const newSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insertNewSale = async ({ id, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );
};

const findAllSales = async () => {
  const [result] = await connection.execute(
    `
    SELECT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, s.date
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id;
    `,
  );
  return result;
};

const findSalesById = async (saleId) => {
  const [result] = await connection.execute(
    `
    SELECT sp.product_id AS productId, sp.quantity, s.date
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id AND sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id;
    `,
    [saleId],
  );
  return result;
};

module.exports = {
  newSaleId,
  insertNewSale,
  findAllSales,
  findSalesById,
};
