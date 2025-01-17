const mongoose=require('mongoose');
const { type } = require('os');

const drhpSchema= new mongoose.Schema({
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
   uploadedAt: {
    type: Date,
    default: Date.now,
  },
})

const drhp = mongoose.model("drhp",drhpSchema);

module.exports = drhp;