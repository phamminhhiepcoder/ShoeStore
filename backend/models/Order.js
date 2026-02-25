const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    voucher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher",
        default: null
    },

    full_name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    method: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    note: {
        type: String
    },

    total_price: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'],
        default: 'pending'
    }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
