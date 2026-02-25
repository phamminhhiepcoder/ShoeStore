const express = require('express');
const router = express.Router();
const Voucher = require('../models/Voucher');

router.get('/', async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.json(vouchers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) return res.status(404).json({ message: "Voucher không tồn tại" });
        res.json(voucher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            name,
            code,
            discount_value,
            min_amount,
            start_date,
            end_date
        } = req.body;

        const newVoucher = new Voucher({
            name,
            code,
            discount_value,
            min_amount,
            start_date,
            end_date
        });

        await newVoucher.save();
        res.status(201).json(newVoucher);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const {
            name,
            code,
            discount_value,
            min_amount,
            start_date,
            end_date
        } = req.body;

        const updated = await Voucher.findByIdAndUpdate(
            req.params.id,
            {
                name,
                code,
                discount_value,
                min_amount,
                start_date,
                end_date
            },
            { new: true }
        );

        if (!updated)
            return res.status(404).json({ message: "Voucher không tồn tại" });

        res.json(updated);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Voucher.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Voucher không tồn tại" });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
