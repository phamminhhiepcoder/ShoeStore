const express = require('express');
const router = express.Router();
const Color = require('../models/Color');

router.get('/', async (req, res) => {
    try {
        const colors = await Color.find();
        res.json(colors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const color = await Color.findById(req.params.id);
        if (!color) return res.status(404).json({ message: "Color không tồn tại" });
        res.json(color);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newColor = new Color({
            name: req.body.name,
            description: req.body.description
        });
        await newColor.save();
        res.status(201).json(newColor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await Color.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, description: req.body.description },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Color không tồn tại" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Color.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Color không tồn tại" });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
