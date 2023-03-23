const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT || 3306,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;