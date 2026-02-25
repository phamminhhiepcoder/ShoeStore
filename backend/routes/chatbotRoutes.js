const express = require("express");
const router = express.Router();
const axios = require("axios");

const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");
const Size = require("../models/Size");
const Color = require("../models/Color");

router.post("/recommend", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Thiếu message" });
        }

        const extract = (key) => {
            const regex = new RegExp(`${key}\\s*:\\s*([^;]+)`, "i");
            const match = message.match(regex);
            return match ? match[1].trim() : "";
        };

        const gender = extract("Giới tính");
        const size = extract("Size");
        const style = extract("Phong cách");
        const purpose = extract("Mục đích");
        const favoriteColors = extract("Màu")
            ? extract("Màu").split(",").map(c => c.trim())
            : [];


        const sizeDoc = await Size.findOne({ name: size });

        if (!sizeDoc) {
            return res.status(400).json({ message: "Size không tồn tại" });
        }

        let colorIds = [];

        if (favoriteColors && favoriteColors.length > 0) {
            const colors = await Color.find({
                name: { $in: favoriteColors }
            });

            colorIds = colors.map(c => c._id);
        }

        const query = {
            quantity: { $gt: 0 },
            size_id: sizeDoc._id
        };

        if (colorIds.length > 0) {
            query.color_id = { $in: colorIds };
        }

        const variants = await ProductVariant.find({
            quantity: { $gt: 0 }
        })
            .populate({
                path: "product_id",
                match: { status: "active" },
                select: "name category description images",
                populate: {
                    path: "images",
                    select: "url"
                }
            })
            .populate("size_id", "name")
            .populate("color_id", "name");


        const productsForAI = variants
            .filter(v => v.product_id)
            .map(v => ({
                productId: v.product_id._id.toString(),
                name: v.product_id.name,
                category: v.product_id.category,
                description: v.product_id.description,
                size: v.size_id.name,
                color: v.color_id.name,
                price: v.price,
                image: v.product_id.images?.[0]?.url || ""
            }));


        if (productsForAI.length === 0) {
            return res.json({ message: "Không có sản phẩm phù hợp" });
        }
        const prompt = `
Bạn là chuyên gia tư vấn giày dép.

Danh sách sản phẩm hiện có:
${JSON.stringify(productsForAI, null, 2)}

Thông tin khách hàng:
- Giới tính: ${gender}
- Size: ${size}
- Phong cách: ${style}
- Mục đích: ${purpose}
- Màu sắc yêu thích: ${favoriteColors.join(", ")}

Hãy chọn tối đa 3 sản phẩm phù hợp nhất.

Trả về kết quả ở định dạng JSON, không viết text hay json gì::
{
  "recommendations": [
    {
      "productId": "",
      "name": "",
      "price": 0,
      "reason": ""
    }
  ]
}
`;

        const aiResponse = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "Bạn là chatbot tư vấn bán hàng" },
                    { role: "user", content: prompt }
                ],
                temperature: 0.4,
                max_tokens: 400
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const content = aiResponse.data.choices[0].message.content;
        const result = JSON.parse(content);

        const BASE_PRODUCT_URL = "http://localhost:5173/products";

        const finalResult = {
            recommendations: result.recommendations.map(item => {
                const product = productsForAI.find(p => p.productId === item.productId);

                return {
                    ...item,
                    link: `${BASE_PRODUCT_URL}/${item.productId}`,
                    image: product?.image || ""
                };
            })
        };

        res.json(finalResult);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Chatbot error" });
    }
});

module.exports = router;
