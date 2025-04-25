const mongoose = require("mongoose")

const clickSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    ip: String,
    browser: String,
    os: String,
    device: String,
    country: String,
    region: String,
    city: String,
    userAgent: String,
    language: String,
    referrer: String,
});

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
    clickInfo: [clickSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })

const Url = mongoose.model("url", urlSchema)

module.exports = Url;