const mongoose = require('mongoose');

const InvestorGrievanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true, 
    },
    number: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
});

const InvestorGrievance = mongoose.model('InvestorGrievance', InvestorGrievanceSchema);

module.exports = InvestorGrievance;
