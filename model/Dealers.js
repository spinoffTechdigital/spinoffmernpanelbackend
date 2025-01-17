const mongoose = require('mongoose');

const DealerSchema= mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    number:{
        type: String,
        require: true,
    },
    location:{
        type: String,
        require: true,
    }
});

const Dealers= mongoose.model('Dealers',DealerSchema);

module.exports = Dealers;