const mongoose = require('mongoose');

const importDetailSchema = new mongoose.Schema({
    import_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Import",
        required: true
    },

    product_variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true
    },

    import_price: { type: Number, required: true },
    quantity: { type: Number, required: true },

    subtotal: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ImportDetail', importDetailSchema);
