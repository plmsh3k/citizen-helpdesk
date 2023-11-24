const Device = require("../models/device");

const getAllDevices = async () => {
    try {
        const devices = await Device.find({});
        return devices;
    } catch (error) {
        throw new Error("Unable to fetch devices");
    }
};

const getSubscriptionPage = (req, res) => {
    res.render("deviceinfo");
};

const saveDevice = async (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.serialNumber || !req.body.issue) {
        res.status(400).send("Invalid request body");
        return;
    }

    const { name, serialNumber, issue } = req.body;

    try {
        const newDevice = new Device({
            name,
            serialNumber,
            issue,
        });

        const savedDevice = await newDevice.save();

        res.render("thanks", { device: savedDevice });
    } catch (error) {
        if (error.name === "ValidationError") {
            // Handle validation errors
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.render("deviceinfo", { validationErrors });
        } else {
            // Handle other errors
            console.error(error);
            res.status(500).send('Server Error');
        }
        // Call next with the error parameter
        next(error);
    }
};

const getDeviceById = async (deviceId) => {
    try {
        const device = await Device.findById(deviceId).populate('customer').exec();
        return device;
    } catch (error) {
        throw new Error("Unable to fetch device");
    }
};

module.exports = {
    getAllDevices,
    getSubscriptionPage,
    saveDevice,
    getDeviceById
};
