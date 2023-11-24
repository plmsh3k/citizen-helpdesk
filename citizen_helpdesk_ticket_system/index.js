const mongoose = require("mongoose");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const customersController = require('./controllers/customersController');
const devicesController = require('./controllers/devicesController');

const Customer = require("./models/customer");
const Device = require("./models/device");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = mongoose.connection;
mongoose.connect("mongodb://127.0.0.1:27017/ticket_db", { useNewUrlParser: true });

db.once('open', async () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

app.get('/customers', async (req, res) => {
    try {
        const customers = await customersController.getAllCustomers();
        res.render('customers', { customers: customers });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/devices', async (req, res) => {
    try {
        const devices = await devicesController.getAllDevices();
        res.render('devices', { devices: devices });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.get("/contact", customersController.getSubscriptionPage);
app.post("/deviceInfo", customersController.saveCustomer);

// Update the deviceInfo route to render the deviceinfo.ejs page
app.get("/deviceInfo", devicesController.getSubscriptionPage);
app.post("/addData", devicesController.saveDevice);

app.post("/addData", (req, res) => {
    // Render the thanks.ejs page here
    res.render("thanks");
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
