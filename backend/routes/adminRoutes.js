const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const OrderDetail = require("../models/OrderDetail");
const ProductVariant = require("../models/ProductVariant");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
router.get("/statistics", async (req, res) => {
    try {
        const users = await User.countDocuments();

        const products = await Product.countDocuments();

        const orders = await Order.countDocuments();

        const revenueResult = await OrderDetail.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$subtotal" },
                    totalSold: { $sum: "$quantity" }
                }
            }
        ]);

        const totalRevenue = revenueResult[0]?.totalRevenue || 0;
        const totalSold = revenueResult[0]?.totalSold || 0;

        res.json({
            users,
            products,
            orders,
            totalRevenue,
            totalSold
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Statistics error" });
    }
});

router.get("/revenue-by-product", async (req, res) => {
    try {
        const result = await OrderDetail.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "order_id",
                    foreignField: "_id",
                    as: "order"
                }
            },
            { $unwind: "$order" },
            {
                $match: {
                    "order.status": "completed"
                }
            },
            {
                $lookup: {
                    from: "productvariants",
                    localField: "product_variant_id",
                    foreignField: "_id",
                    as: "variant"
                }
            },
            { $unwind: "$variant" },
            {
                $lookup: {
                    from: "products",
                    localField: "variant.product_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            {
                $group: {
                    _id: "$product._id",
                    productName: { $first: "$product.name" },
                    totalQuantity: { $sum: "$quantity" },
                    totalRevenue: { $sum: "$subtotal" }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
router.get("/revenue-by-month", async (req, res) => {
    try {
        const year = parseInt(req.query.year) || new Date().getFullYear();

        const data = await OrderDetail.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "order_id",
                    foreignField: "_id",
                    as: "order"
                }
            },
            { $unwind: "$order" },
            {
                $match: {
                    "order.status": "completed",
                    "order.createdAt": {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${year + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$order.createdAt" }
                    },
                    totalOrders: { $addToSet: "$order_id" },
                    totalRevenue: { $sum: "$subtotal" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    totalRevenue: 1,
                    totalOrders: { $size: "$totalOrders" }
                }
            },
            { $sort: { month: 1 } }
        ]);

        const fullYearData = Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            const found = data.find(d => d.month === month);

            return {
                year,
                month,
                totalRevenue: found ? found.totalRevenue : 0,
                totalOrders: found ? found.totalOrders : 0
            };
        });

        res.json(fullYearData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
