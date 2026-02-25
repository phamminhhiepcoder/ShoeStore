const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    created_at: String,
    updated_at: String
});

module.exports = mongoose.model('Supplier', supplierSchema);
