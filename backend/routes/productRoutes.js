// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");
const Review = require("../models/Review");

const ProductVariant = require("../models/ProductVariant");
const GitHubUploadService = require("../utils/GitHubUploadService");

const upload = multer({ dest: "uploads/" });
const uploader = new GitHubUploadService();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({ status: "active" }) 
            .populate("brandId", "name")
            .populate("images");

        const result = await Promise.all(
            products.map(async (product) => {

                const variants = await ProductVariant.find({
                    product_id: product._id,
                    quantity: { $gt: 0 }
                })
                    .populate("size_id", "name")
                    .populate("color_id", "name");

                const minPrice =
                    variants.length > 0
                        ? Math.min(...variants.map(v => v.price))
                        : product.price;

                const sizes = [
                    ...new Set(
                        variants
                            .map(v => v.size_id?.name)
                            .filter(Boolean)
                    )
                ];

                const colors = [
                    ...new Set(
                        variants
                            .map(v => v.color_id?.name)
                            .filter(Boolean)
                    )
                ];

                return {
                    ...product.toObject(),
                    minPrice,
                    size: sizes.join(", "),
                    color: colors.join(", ")
                };
            })
        );

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


router.get("/newest", async (req, res) => {
    try {
        const products = await Product.find({ status: "active" })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("brandId", "name")
            .populate("images");

        const productsWithMinPrice = await Promise.all(
            products.map(async (product) => {
                const minVariant = await ProductVariant.find({ product_id: product._id, quantity: { $gt: 0 } })
                    .sort({ price: 1 })
                    .limit(1);

                const minPrice = minVariant.length > 0 ? minVariant[0].price : product.price;

                return {
                    ...product.toObject(),
                    minPrice
                };
            })
        );

        res.json(productsWithMinPrice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/best-seller", async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $match: { status: "active" } },
            { $sample: { size: 5 } }
        ]);

        const populated = await Product.populate(products, [
            { path: "brandId", select: "name" },
            { path: "images" }
        ]);

        const result = await Promise.all(
            populated.map(async (product) => {
                const minVariant = await ProductVariant.findOne({
                    product_id: product._id,
                    quantity: { $gt: 0 }
                }).sort({ price: 1 });

                return {
                    ...product,
                    minPrice: minVariant ? minVariant.price : 0
                };
            })
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("brandId", "name")
            .populate("images");

        if (!product)
            return res.status(404).json({ message: "Product không tồn tại" });

        const variants = await ProductVariant.find({
            product_id: req.params.id,
            quantity: { $gt: 0 }
        })
            .populate("size_id", "name")
            .populate("color_id", "name");

        const reviewStats = await Review.aggregate([
            {
                $match: {
                    product_id: product._id
                }
            },
            {
                $group: {
                    _id: "$product_id",
                    reviewCount: { $sum: 1 },
                    averageRating: { $avg: "$star" }
                }
            }
        ]);

        const result = {
            ...product.toObject(),
            variants,
            reviewCount: reviewStats[0]?.reviewCount || 0,
            averageRating: reviewStats[0]
                ? Number(reviewStats[0].averageRating.toFixed(1))
                : 0
        };

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.post("/", upload.array("images", 10), async (req, res) => {
    try {
        const { name, description, category, brandId, price, status } = req.body;

        const newProduct = new Product({
            name,
            description,
            category,
            brandId,
            price,
            status,
            images: []
        });

        await newProduct.save();

        if (req.files && req.files.length > 0) {
            const imageDocs = [];

            for (const file of req.files) {
                const imgUrl = await uploader.uploadFile(file, `products/${file.originalname}`);

                const imgDoc = new ProductImage({
                    productId: newProduct._id,
                    url: imgUrl
                });

                await imgDoc.save();
                imageDocs.push(imgDoc._id);
            }

            newProduct.images = imageDocs;
            await newProduct.save();
        }

        const populated = await newProduct.populate([
            { path: "images" },
            { path: "brandId" }
        ]);

        res.status(201).json(populated);

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});


router.put("/:id", upload.array("images", 10), async (req, res) => {
    try {
        const { name, description, category, brandId, price, status, oldImages } = req.body;

        const product = await Product.findById(req.params.id)
            .populate("images");

        if (!product)
            return res.status(404).json({ message: "Product không tồn tại" });

        product.name = name;
        product.description = description;
        product.category = category;
        product.brandId = brandId;
        product.price = price;
        product.status = status;

        const oldIds = oldImages ? JSON.parse(oldImages) : [];

        const imagesToDelete = product.images.filter(img => !oldIds.includes(img._id.toString()));

        for (const img of imagesToDelete) {
            await ProductImage.findByIdAndDelete(img._id);
        }

        product.images = [...oldIds];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const imgUrl = await uploader.uploadFile(file, `products/${file.originalname}`);
                const imgDoc = new ProductImage({
                    productId: product._id,
                    url: imgUrl
                });
                await imgDoc.save();

                product.images.push(imgDoc._id);
            }
        }

        await product.save();

        const populated = await product.populate([
            { path: "images" },
            { path: "brandId" }
        ]);

        res.status(200).json(populated);

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});


router.patch("/:id/toggle-status", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product không tồn tại" });

        product.status = product.status === "active" ? "inactive" : "active";
        await product.save();

        res.json({
            message: "Đã thay đổi trạng thái sản phẩm",
            status: product.status
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
