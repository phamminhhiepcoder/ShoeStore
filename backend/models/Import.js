const mongoose = require('mongoose');

const importSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },

    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },

    note: { type: String },
    total_price: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Import', importSchema);
