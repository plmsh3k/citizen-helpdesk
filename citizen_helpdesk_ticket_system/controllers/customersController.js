const Customer = require("../models/customer");

const getAllCustomers = async () => {
    try {
        const customers = await Customer.find({});
        return customers;
    } catch (error) {
        throw new Error("Unable to fetch customers");
    }
};

const getSubscriptionPage = (req, res) => {
    res.render("contact");
};

const saveCustomer = async (req, res, next) => {
    if (!req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber) {
        res.status(400).send("Invalid request body");
        return;
    }

    const { firstName, lastName, email, phoneNumber, i } = req.body;

    const newCustomer = new Customer({
        name: {
            first: firstName,
            last: lastName
        },
        email,
        phoneNumber,
        
    });

    try {
        const savedDocument = await newCustomer.save();
        console.log(savedDocument);
        res.render("deviceinfo");
    } catch (error) {
        if (error.name === "ValidationError") {
            // Handle validation errors
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.render("contact", { validationErrors });
        } else {
            // Handle other errors
            console.error(error);
            res.status(500).send('Server Error');
        }
        // Call next with the error parameter
        next(error);
    }
};

module.exports = { 
    getAllCustomers,
    getSubscriptionPage,
    saveCustomer
};
