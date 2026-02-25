const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductImage" }], 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);