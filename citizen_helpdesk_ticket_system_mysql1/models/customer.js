const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ticket_db',
};

const pool = mysql.createPool(dbConfig);

const customerModel = {
  create: async function (customerData) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO customers (first_name, last_name, email, phone_number, device_id) VALUES (?, ?, ?, ?, ?)',
        [
          customerData.name.first,
          customerData.name.last,
          customerData.email,
          customerData.phoneNumber,
          customerData.device
        ]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  },

  getInfo: function () {
    return `Name: ${this.name.first} ${this.name.last} Email: ${this.email} Phone Number: ${this.phoneNumber}`;
  },

  findNameCustomers: async function () {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM customers WHERE first_name = ? AND last_name = ?',
        [this.name.first, this.name.last]
      );
      return rows;
    } finally {
      connection.release();
    }
  },
};

module.exports = customerModel;
