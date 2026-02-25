const express = require("express");
const router = express.Router();
const multer = require("multer");
const Brand = require("../models/Brand");
const GitHubUploadService = require("../utils/GitHubUploadService");

const upload = multer({ dest: "uploads/" });
const uploader = new GitHubUploadService();


router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) return res.status(404).json({ message: "Brand không tồn tại" });
        res.json(brand);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/", upload.single("img"), async (req, res) => {
    try {
        let imgUrl = "";

        if (req.file) {
            imgUrl = await uploader.uploadFile(req.file, `brands/${req.file.originalname}`);
        }

        const newBrand = new Brand({
            name: req.body.name,
            description: req.body.description,
            img: imgUrl || null
        });

        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.put("/:id", upload.single("img"), async (req, res) => {
    try {
        let imgUrl = null;

        if (req.file) {
            imgUrl = await uploader.uploadFile(
                req.file,
                `brands/${req.file.originalname}`
            );
        }

        const updateData = {
            name: req.body.name,
            description: req.body.description,
        };

        if (imgUrl) {
            updateData.img = imgUrl;
        }

        const updated = await Brand.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updated)
            return res.status(404).json({ message: "Brand không tồn tại" });

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Brand.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Brand không tồn tại" });

        res.json({ message: "Đã xóa brand" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
