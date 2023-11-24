const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ticket_db',
};

const pool = mysql.createPool(dbConfig);

const deviceModel = {
  create: async function (deviceData) {
    const connection = await pool.getConnection();
    try {
      // Updated SQL query to include customer_id as a foreign key
      const [result] = await connection.query(
        'INSERT INTO devices (name, serial_number, customer_id, issue) VALUES (?, ?, ?, ?)',
        [
          deviceData.name,
          deviceData.serialNumber,
          deviceData.customer,
          deviceData.issue,
        ]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  },

  getInfo: function () {
    return `Name: ${this.name} Serial Number: ${this.serialNumber} Customer ID: ${this.customer} Issue: ${this.issue}`;
  },
};

module.exports = deviceModel;
