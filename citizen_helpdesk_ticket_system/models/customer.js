const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: false
    },
    phoneNumber: {
        type: Number, 
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }
});

customerSchema.methods.getInfo = function() {
    return `Name: ${this.name.first} ${this.name.last} Email: ${this.email} Phone Number: ${this.phoneNumber} Issue: ${this.issue}`;
};

// Add an instance method 'findNameCustomers'
customerSchema.methods.findNameCustomers = function () {
    const { first, last } = this.name; // Destructure the name object
    return this.model("Customer").find({ "name.first": first, "name.last": last }).exec();
};

module.exports = mongoose.model("Customer", customerSchema);
