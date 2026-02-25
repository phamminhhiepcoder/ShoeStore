const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String
});

module.exports = mongoose.model('Brand', brandSchema);
