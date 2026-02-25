const express = require("express");
const router = express.Router();

const Import = require("../models/Import");
const ImportDetail = require("../models/ImportDetail");
const ProductVariant = require("../models/ProductVariant");
const Supplier = require("../models/Supplier");

function generateImportCode() {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `IMP-${year}-${random}`;
}

router.post("/", async (req, res) => {
    try {
        const { supplier_id, note, items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Danh sách sản phẩm không hợp lệ" });
        }

        const supplier = await Supplier.findById(supplier_id);
        if (!supplier)
            return res.status(404).json({ message: "Supplier không tồn tại" });

        const importDoc = new Import({
            code: generateImportCode(),
            supplier_id,
            note,
            total_price: 0
        });
        await importDoc.save();

        let total = 0;

        for (const item of items) {
            let variant = null;

            if (item.product_variant_id) {
                variant = await ProductVariant.findById(item.product_variant_id);
            } else {
                variant = await ProductVariant.findOne({
                    product_id: item.product_id,
                    size_id: item.size_id,
                    color_id: item.color_id,
                });

                if (!variant) {
                    variant = new ProductVariant({
                        product_id: item.product_id,
                        size_id: item.size_id,
                        color_id: item.color_id,
                        import_price: item.import_price,
                        price: item.import_price * 1.2, 
                        quantity: 0
                    });
                    await variant.save();
                }
            }

            if (!variant) continue;

            const subtotal = item.import_price * item.quantity;
            total += subtotal;

            await ImportDetail.create({
                import_id: importDoc._id,
                product_variant_id: variant._id,
                import_price: item.import_price,
                quantity: item.quantity,
                subtotal
            });

            variant.quantity += item.quantity;
            variant.import_price = item.import_price;
            await variant.save();
        }

        importDoc.total_price = total;
        await importDoc.save();

        const populated = await Import.findById(importDoc._id)
            .populate("supplier_id");

        res.status(201).json({
            message: "Tạo phiếu nhập thành công",
            import: populated
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
