const mongoose=require('mongoose');
const { type } = require('os');

const rhpSchema= new mongoose.Schema({
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

const rhp = mongoose.model("rhp",rhpSchema);

module.exports = rhp;