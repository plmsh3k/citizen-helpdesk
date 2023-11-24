const Customer = require("../models/customer");

const getAllCustomers = async (pool) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM customers');
    return rows.map((customer) => ({
      _id: customer.customer_id,
      name: {
        first: customer.first_name,
        last: customer.last_name,
      },
      phoneNumber: customer.phone_number,
      email: customer.email,
    }));
  } finally {
    connection.release();
  }
};

const getSubscriptionPage = (req, res) => {
  res.render("contact");
};

const saveCustomer = async (pool, req, res, next) => {
  if (!req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber) {
    res.status(400).send("Invalid request body");
    return;
  }

  const { firstName, lastName, email, phoneNumber } = req.body;

  const newCustomerData = {
    name: {
      first: firstName,
      last: lastName
    },
    email,
    phoneNumber
  };

  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO customers (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)',
      [newCustomerData.name.first, newCustomerData.name.last, newCustomerData.email, newCustomerData.phoneNumber]
    );

    const newCustomerId = result.insertId;

    // Save the customer ID in session
    req.session.customerId = newCustomerId;

    res.render("deviceinfo");
  } catch (error) {
    console.error(error);

    if (error.name === 'ER_DUP_ENTRY') {
      res.render("contact", { validationErrors: ["Email must be unique"] });
    } else {
      res.status(500).send('Server Error');
    }

    next(error);
  } finally {
    connection.release();
  }
};

module.exports = { 
  getAllCustomers,
  getSubscriptionPage,
  saveCustomer, 
};
