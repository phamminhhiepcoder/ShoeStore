const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Size', sizeSchema);
