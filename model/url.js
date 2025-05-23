// model/url.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true }
});

const Url = mongoose.model('Url', urlSchema);
module.exports = { Url };