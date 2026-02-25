const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    discount_value: { type: Number, required: true }, 
    min_amount: { type: Number, default: 0 },        
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Voucher', voucherSchema);
