const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const ProductVariant = require("../models/ProductVariant");
const Voucher = require("../models/Voucher");
const Size = require("../models/Size");
const Color = require("../models/Color");

const config = {
    vnp_TmnCode: "4U24A3OG",
    vnp_HashSecret: "NQMWKR3HWPELNPD4855IFE2EOUUXYEQW",
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_ReturnUrl: "http://localhost:5173/"
};

function generateOrderCode() {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${year}-${random}`;
}

function formatDate(date) {
    const pad = (n) => n.toString().padStart(2, "0");
    return (
        date.getFullYear() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds())
    );
}

function sortObject(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
}

router.get("/", async (req, res) => {
    const orders = await Order.find()
        .populate("user_id", "fullName email phone")
        .populate("voucher_id")
        .sort({ createdAt: -1 });

    res.json(orders);
});


router.post("/", async (req, res) => {
    try {
        const {
            user_id,
            voucher_id,
            full_name,
            phone,
            email,
            address,
            note,
            method,
            items
        } = req.body;

        if (!items || !items.length) {
            return res.status(400).json({ message: "Giỏ hàng trống" });
        }

        let subtotal = 0;

        const order = await Order.create({
            code: generateOrderCode(),
            user_id,
            voucher_id,
            full_name,
            phone,
            email,
            address,
            note,
            method,
            status: "pending",
            total_price: 0
        });

        for (const item of items) {
            const size = await Size.findOne({ name: item.size });
            const color = await Color.findOne({ name: item.color });

            if (!size || !color) {
                return res.status(404).json({
                    message: `Size hoặc màu không tồn tại (${item.size}/${item.color})`
                });
            }

            const variant = await ProductVariant.findOne({
                product_id: item.product_id,
                size_id: size._id,
                color_id: color._id
            });

            if (!variant) {
                return res.status(404).json({
                    message: `Không tìm thấy sản phẩm ${item.size}/${item.color}`
                });
            }

            if (variant.quantity < item.quantity) {
                return res.status(400).json({
                    message: `Không đủ hàng (${item.size}/${item.color})`
                });
            }

            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;

            await OrderDetail.create({
                order_id: order._id,
                product_variant_id: variant._id,
                price: item.price,
                quantity: item.quantity,
                subtotal: itemSubtotal
            });

            variant.quantity -= item.quantity;
            await variant.save();
        }


        let discount = 0;

        if (voucher_id) {
            const voucher = await Voucher.findById(voucher_id);

            if (
                voucher &&
                subtotal >= voucher.min_amount
            ) {
                discount = (subtotal * voucher.discount_value) / 100;
            }
        }

        const total = Math.max(subtotal - discount, 0);

        order.total_price = total;
        await order.save();

        if (method === "cod") {
            return res.status(201).json({
                message: "Đặt hàng COD thành công",
                order
            });
        }

        if (method === "vnpay") {
            return res.status(201).json({
                message: "Tạo đơn hàng VNPAY",
                order_id: order._id,
                amount: total
            });
        }

        res.status(400).json({ message: "Phương thức thanh toán không hợp lệ" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order không tồn tại" });
        }

        if (order.status === "completed") {
            return res.status(400).json({
                message: "Không thể xoá đơn đã hoàn thành"
            });
        }

        const details = await OrderDetail.find({ order_id: order._id });

        for (const d of details) {
            const variant = await ProductVariant.findById(
                d.product_variant_id
            );
            if (variant) {
                variant.quantity += d.quantity;
                await variant.save();
            }
        }

        await OrderDetail.deleteMany({ order_id: order._id });
        await Order.deleteOne({ _id: order._id });

        res.json({ message: "Đã xoá đơn hàng và hoàn kho" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi xoá đơn hàng" });
    }
});

router.post("/vnpay/create", async (req, res) => {
    try {
        const { order_id } = req.body;
        const order = await Order.findById(order_id);

        if (!order) {
            return res.status(404).json({ message: "Order không tồn tại" });
        }

        const vnp_Params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: config.vnp_TmnCode,
            vnp_Amount: order.total_price * 100,
            vnp_CurrCode: "VND",
            vnp_TxnRef: order.code,
            vnp_OrderInfo: `Thanh toán đơn hàng ${order.code}`,
            vnp_OrderType: "other",
            vnp_Locale: "vn",
            vnp_ReturnUrl: config.vnp_ReturnUrl,
            vnp_IpAddr: "127.0.0.1",
            vnp_CreateDate: formatDate(new Date())
        };

        const sortedParams = sortObject(vnp_Params);
        const signData = new URLSearchParams(sortedParams).toString();

        const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
        const secureHash = hmac.update(signData).digest("hex");

        const paymentUrl =
            config.vnp_Url + "?" + signData + "&vnp_SecureHash=" + secureHash;

        res.json({ paymentUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi tạo thanh toán VNPAY" });
    }
});


router.get("/vnpay/return", async (req, res) => {
    try {
        const vnp_Params = { ...req.query };
        const secureHash = vnp_Params.vnp_SecureHash;

        delete vnp_Params.vnp_SecureHash;
        delete vnp_Params.vnp_SecureHashType;

        const sortedParams = sortObject(vnp_Params);
        const signData = new URLSearchParams(sortedParams).toString();

        const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
        const checkHash = hmac.update(signData).digest("hex");

        if (secureHash !== checkHash) {
            return res.status(400).send("Chữ ký không hợp lệ");
        }

        const orderCode = vnp_Params.vnp_TxnRef;
        const order = await Order.findOne({ code: orderCode });

        if (!order) return res.status(404).send("Order không tồn tại");

        if (vnp_Params.vnp_ResponseCode === "00") {
            order.status = "confirmed";
            await order.save();
            return res.redirect("http://localhost:3000/payment-success");
        }

        res.redirect("http://localhost:3000/payment-failed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi xử lý VNPAY");
    }
});

router.get("/:id/detail", async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("user_id", "fullName email phone")
        .populate("voucher_id");

    const details = await OrderDetail.find({ order_id: order._id })
        .populate({
            path: "product_variant_id",
            populate: [
                { path: "product_id", select: "name images" },
                { path: "size_id", select: "name" },
                { path: "color_id", select: "name" }
            ]
        });

    res.json({ order, details });
});

router.put("/:id/status", async (req, res) => {
    const { status } = req.body;

    const allowStatus = [
        "pending",
        "confirmed",
        "shipping",
        "completed",
        "cancelled"
    ];

    if (!allowStatus.includes(status)) {
        return res.status(400).json({ message: "Status không hợp lệ" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ message: "Order không tồn tại" });
    }

    order.status = status;
    await order.save();

    res.json(order);
});
router.put("/:id/cancel", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order không tồn tại" });
        }

        if (!["pending", "confirmed"].includes(order.status)) {
            return res.status(400).json({
                message: "Không thể huỷ đơn ở trạng thái này"
            });
        }

        const details = await OrderDetail.find({ order_id: order._id });

        for (const d of details) {
            const variant = await ProductVariant.findById(d.product_variant_id);
            if (variant) {
                variant.quantity += d.quantity;
                await variant.save();
            }
        }

        order.status = "cancelled";
        await order.save();

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi huỷ đơn hàng" });
    }
});


router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user_id: userId })
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi lấy đơn hàng theo user" });
    }
});



module.exports = router;
