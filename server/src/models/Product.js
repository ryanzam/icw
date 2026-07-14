const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, index: true },
        description: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: ["skincare", "haircare", "fragrance", "cosmetics", "wellness"],
            index: true,
        },
        brand: { type: String, trim: true },
        images: [{ type: String, required: true }],
        price: { type: Number, required: true, min: 0 },
        compareAtPrice: { type: Number, min: 0 },
        currency: { type: String, default: "NPR" },
        stock: { type: Number, required: true, default: 0, min: 0 },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        //reviews: [reviewSchema],
        isFeatured: { type: Boolean, default: false },
        isOnSale: { type: Boolean, default: false },
        freeDelivery: { type: Boolean, default: true },
        tags: [{ type: String }],
    },
    { timestamps: true }
);

productSchema.index({ name: "text", description: "text", brand: "text" });

productSchema.virtual("discountPercent").get(function discountPercent() {
    if (!this.compareAtPrice || this.compareAtPrice <= this.price) return 0;
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
});

productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);