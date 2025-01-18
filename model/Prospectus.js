const mongoose = require('mongoose');

const ProspectusSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    year:{
        type: String,
        require: true,
    },
    file:{
        type: String,
        require: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
      },
});

const Prospectus = mongoose.model("prospect",ProspectusSchema);

module.exports = Prospectus;