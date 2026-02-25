const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const OrderDetail = require("../models/OrderDetail");
const ProductVariant = require("../models/ProductVariant");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const Address = require("../models/Address");

router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "Thiếu userId" });
        }

        const addresses = await Address.find({ user_id: userId })
            .sort({ isDefault: -1, createdAt: -1 });

        res.json(addresses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { userId, fullName, phone, email, address, isDefault } = req.body;

        if (!userId || !fullName || !phone || !address) {
            return res.status(400).json({ message: "Thiếu thông tin" });
        }

        if (isDefault) {
            await Address.updateMany(
                { user_id: userId },
                { isDefault: false }
            );
        }

        const newAddress = new Address({
            user_id: userId,
            fullName,
            phone,
            email,
            address,
            isDefault
        });

        await newAddress.save();
        res.status(201).json(newAddress);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { userId, fullName, phone, email, address, isDefault } = req.body;

        const addr = await Address.findOne({
            _id: req.params.id,
            user_id: userId
        });

        if (!addr) {
            return res.status(404).json({ message: "Không tìm thấy địa chỉ" });
        }

        if (isDefault) {
            await Address.updateMany(
                { user_id: userId },
                { isDefault: false }
            );
        }

        Object.assign(addr, {
            fullName,
            phone,
            email,
            address,
            isDefault
        });

        await addr.save();
        res.json(addr);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.query;

        const deleted = await Address.findOneAndDelete({
            _id: req.params.id,
            user_id: userId
        });

        if (!deleted) {
            return res.status(404).json({ message: "Không tìm thấy địa chỉ" });
        }

        res.json({ message: "Đã xoá địa chỉ" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
