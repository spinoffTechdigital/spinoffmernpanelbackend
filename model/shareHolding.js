const mongoose=require('mongoose');
const { type } = require('os');

const shareHoldingSchema= new mongoose.Schema({
   title:{
    type: String,
    required: true,
   },
   year:{
    type: String,
    required: true,
   },
   file:{
    type: String,
    required: true,
   },
   userId: {
    type: String,
    required: true,
  },
   uploadedAt: {
    type: Date,
    default: Date.now,
  },
})

const shareHolding = mongoose.model("shareHolding",shareHoldingSchema);

module.exports = shareHolding;