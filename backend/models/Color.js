const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Color', colorSchema);
