const Subscribe = require("../model/Subscribe");

const registerUser = async (req,res)=>{
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const existingSubscription = await Subscribe.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ message: 'Already subscribed!' });
        }

        const newSubscription = new Subscribe({ email });
        await newSubscription.save();

        res.status(200).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    registerUser
};