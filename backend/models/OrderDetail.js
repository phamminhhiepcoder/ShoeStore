const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    product_variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    subtotal: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
