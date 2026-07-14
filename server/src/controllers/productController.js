const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");


const getProducts = asyncHandler(async (req, res) => {
    const { search, category, sale, featured, page = 1, limit = 20, sort } = req.query;

    const query = {};
    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (sale === "true") query.isOnSale = true;
    if (featured === "true") query.isFeatured = true;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 50);

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const [items, total] = await Promise.all([
        Product.find(query)
            .sort(sortOption)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum),
        Product.countDocuments(query),
    ]);

    res.json({
        success: true,
        data: items,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum) || 1,
        },
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
        "reviews.user",
        "name avatarUrl"
    );
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.json({ success: true, data: product });
});

module.exports = { getProducts, getProductById }