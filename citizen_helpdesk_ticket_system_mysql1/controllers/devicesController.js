const Device = require("../models/device");

const getAllDevices = async (pool) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM devices');
    return rows.map((device) => ({
      _id: device.device_id,
      name: device.name,
      serialNumber: device.serial_number,
      issue: device.issue,
      customerId: device.customer_id
    }));
  } finally {
    connection.release();
  }
};

const getSubscriptionPage = (req, res) => {
  res.render("deviceinfo");
};

const saveDevice = async (pool, req, res, next) => {
  if (!req.body || !req.body.name || !req.body.serialNumber || !req.body.issue) {
    res.status(400).send("Invalid request body");
    return;
  }

  const { name, serialNumber, issue } = req.body;

  const newDeviceData = {
    name,
    serialNumber,
    issue,
  };

  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO devices (name, serial_number, issue, customer_id) VALUES (?, ?, ?, ?)',
      [newDeviceData.name, newDeviceData.serialNumber, newDeviceData.issue, req.session.customerId]
    );

    const newDeviceId = result.insertId;

    res.render("thanks");
  } catch (error) {
    console.error(error);

    if (error.name === 'ER_DUP_ENTRY') {
      res.render("deviceinfo", { validationErrors: ["Serial number must be unique"] });
    } else {
      res.status(500).send('Server Error');
    }

    next(error);
  } finally {
    connection.release();
  }
};

const getDeviceById = async (pool, deviceId) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM devices WHERE id = ?', [deviceId]);
    return rows[0]; // Assuming id is unique and expecting only one result
  } finally {
    connection.release();
  }
};

module.exports = {
  getAllDevices,
  getSubscriptionPage,
  saveDevice,
  getDeviceById
};
