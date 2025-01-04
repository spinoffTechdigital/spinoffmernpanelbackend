const mongoose =require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: false }, 
    mobile: { type: String, required: false }, 
    email: { type: String, required: false },
    message: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Contactus = mongoose.model("Contactus", ContactSchema);

module.exports = Contactus;