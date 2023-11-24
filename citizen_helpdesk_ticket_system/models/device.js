const mongoose = require('mongoose'),
    {Schema} = mongoose
    
const Customer = require("./customer");

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    serialNumber: {
        type: String,
        required: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    issue: {
        type: String
    }, 
}, {
    timestamps: true
}
);

deviceSchema.methods.getInfo = function() {
    return `Name: ${this.name} Serial Number: ${this.serialNumber} Customer ID: ${this.customer} Issue:  ${this.issue} `;
};



module.exports = mongoose.model("Device", deviceSchema);
