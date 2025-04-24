const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true
    },
    mainUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    }
}, { timestamps: true })

const Url = mongoose.model("url", urlSchema)

module.exports = Url;