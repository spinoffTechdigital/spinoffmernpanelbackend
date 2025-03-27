const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Subscription', SubscriptionSchema);