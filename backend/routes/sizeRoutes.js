const express = require('express');
const router = express.Router();
const Size = require('../models/Size');
const mongoose = require('mongoose');
router.get('/', async (req, res) => {
    try {
        const sizes = await Size.find();
        res.json(sizes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }

        const size = await Size.findById(req.params.id);
        if (!size) return res.status(404).json({ message: "Size không tồn tại" });

        res.json(size);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newSize = new Size({
            name: req.body.name,
            description: req.body.description
        });
        await newSize.save();
        res.status(201).json(newSize);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await Size.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, description: req.body.description },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Size không tồn tại" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Size.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Size không tồn tại" });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
