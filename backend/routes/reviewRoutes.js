const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Product = require("../models/Product");

router.post("/", async (req, res) => {
    try {
        const { productId, content, star, userId } = req.body;

        if (!content || !star) {
            return res.status(400).json({ message: "Thiếu nội dung hoặc số sao" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        const review = new Review({
            product_id: productId,
            user_id: userId,
            content,
            star
        });

        await review.save();

        const populated = await review.populate("user_id", "fullName avatar");

        res.status(201).json(populated);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/product/:productId", async (req, res) => {
    try {
        const reviews = await Review.find({
            product_id: req.params.productId
        })
            .populate("user_id", "fullName avatar")
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review không tồn tại" });
        }

        await review.deleteOne();

        res.json({ message: "Đã xoá review" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
