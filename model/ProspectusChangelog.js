const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProspectusChangelogSchema = new mongoose.Schema({
    action:{
        type: String,
        required: true,
    },
    collectionName:{
        type: String,
        required: true,
    },
    itemId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Prospectus",
    },
    performedBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    changeDetails:{
        type: Schema.Types.Mixed,
        required: true,
    },
},
{timestamps: true}
);

module.exports= mongoose.model("ProspectusChangelog",ProspectusChangelogSchema);