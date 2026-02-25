const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    size_id: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
    color_id: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },

    import_price: { type: Number, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ProductVariant', productVariantSchema);
