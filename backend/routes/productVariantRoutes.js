const express = require("express");
const router = express.Router();

const ProductVariant = require("../models/ProductVariant");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
    try {
        const variants = await ProductVariant.find()
            .populate({
                path: "product_id",
                populate: { path: "images", select: "url" }
            })
            .populate("size_id", "name")
            .populate("color_id", "name");

        const result = variants.map(v => ({
            id: v._id,
            product_id: v.product_id?._id,
            product_name: v.product_id?.name,
            size: v.size_id?.name,
            color: v.color_id?.name,
            quantity: v.quantity,
            import_price: v.import_price,
            price: v.price,
            image: v.product_id?.images?.[0]?.url || null
        }));

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


router.get("/product/:productId", async (req, res) => {
    try {
        const variants = await ProductVariant.find({
            product_id: req.params.productId
        })
            .populate("size_id", "name")
            .populate("color_id", "name");

        res.json(variants);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id/quantity", async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity < 0) {
            return res.status(400).json({ message: "Số lượng không hợp lệ" });
        }

        const updated = await ProductVariant.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Biến thể không tồn tại" });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id/price", async (req, res) => {
    try {
        const { price } = req.body;

        if (price < 0) {
            return res.status(400).json({ message: "Giá bán không hợp lệ" });
        }

        const updated = await ProductVariant.findByIdAndUpdate(
            req.params.id,
            { price },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Biến thể không tồn tại" });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await ProductVariant.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Biến thể không tồn tại" });
        }

        res.json({ message: "Xoá biến thể thành công" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
