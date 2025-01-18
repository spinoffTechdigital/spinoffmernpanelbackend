const mongoose = require('mongoose');

const DetailsofRegistrarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    telNo: { type: String, required: true },
    tollFreeNo: { type: String, required: true },
    emailId: { type: String, required: true },
    DetailsofRegistrarEmailId: { type: String, required: true },
    contactPerson: { type: String, required: true },
    website: { type: String, required: true },
    sebiRegistrationNo: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('DetailsofRegistrar', DetailsofRegistrarSchema);