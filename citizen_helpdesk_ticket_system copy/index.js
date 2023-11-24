const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2/promise'); // Use mysql2 library

const customersController = require('./controllers/customersController');
const devicesController = require('./controllers/devicesController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Set up express-session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ticket_db',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Check if the connection to MySQL is successful
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to MySQL!');
    connection.release(); // Release the connection back to the pool
  })
  .catch(error => {
    console.error('Error connecting to MySQL:', error.message);
  });

app.get('/customers', async (req, res) => {
  try {
    const customers = await customersController.getAllCustomers(pool);
    res.render('customers', { customers: customers, session: req.session });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/devices', async (req, res) => {
  try {
    const devices = await devicesController.getAllDevices(pool);
    res.render('devices', { devices: devices, session: req.session });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get("/contact", customersController.getSubscriptionPage);
app.post("/deviceInfo", async (req, res, next) => {
  try {
      await customersController.saveCustomer(pool, req, res, next);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

// Update the deviceInfo route to render the deviceinfo.ejs page
app.get("/deviceInfo", devicesController.getSubscriptionPage);

app.post("/addData", async (req, res, next) => {
  try {
      await devicesController.saveDevice(pool, req, res, next);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

// Render the thanks.ejs page here
app.post("/addData", (req, res) => {
  res.render("thanks", { session: req.session });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
