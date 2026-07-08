require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../../models/Product");

const products = [
    {
        name: "L'Oréal Paris Age Perfect Collagen Expert",
        slug: "loreal-age-perfect-collagen-expert",
        description:
            "Re-tightening day cream enriched with collagen to help skin look firmer and more radiant. Ideal for mature skin needing extra hydration and elasticity.",
        category: "skincare",
        brand: "L'Oréal Paris",
        images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800"],
        price: 2000,
        compareAtPrice: 2100,
        stock: 24,
        isOnSale: true,
        isFeatured: true,
        tags: ["face cream", "anti-aging", "collagen"],
    },
    {
        name: "Dr. Rashel Vitamin C Face Serum",
        slug: "dr-rashel-vitamin-c-face-serum",
        description:
            "Brightening and anti-aging face serum packed with Vitamin C to even out skin tone, fade dark spots, and boost natural glow.",
        category: "skincare",
        brand: "Dr. Rashel",
        images: ["https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800"],
        price: 300,
        compareAtPrice: 315,
        stock: 50,
        isOnSale: true,
        isFeatured: true,
        tags: ["serum", "vitamin c", "brightening"],
    },
    {
        name: "Victoria's Secret Velvet Petals Fragrance Mist",
        slug: "victorias-secret-velvet-petals-mist",
        description:
            "A romantic fragrance mist blending sheer petals, iris and soft musk for a delicate, long-lasting scent all day long.",
        category: "fragrance",
        brand: "Victoria's Secret",
        images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800"],
        price: 1600,
        compareAtPrice: 1680,
        stock: 18,
        isOnSale: true,
        isFeatured: true,
        tags: ["perfume", "body mist", "floral"],
    },
    {
        name: "Maybelline Fit Me Matte Foundation",
        slug: "maybelline-fit-me-matte-foundation",
        description:
            "Lightweight, buildable foundation with a natural matte finish that fits your skin tone and controls shine all day.",
        category: "cosmetics",
        brand: "Maybelline",
        images: ["https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=800"],
        price: 950,
        stock: 35,
        isFeatured: true,
        tags: ["foundation", "makeup"],
    },
    {
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        slug: "ordinary-niacinamide-zinc",
        description:
            "A high-strength vitamin and mineral blemish formula that visibly reduces the appearance of skin blemishes and congestion.",
        category: "skincare",
        brand: "The Ordinary",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"],
        price: 850,
        stock: 60,
        isFeatured: true,
        tags: ["serum", "niacinamide", "oil control"],
    },
    {
        name: "Nivea Soft Refreshing Moisturizing Cream",
        slug: "nivea-soft-moisturizing-cream",
        description:
            "Light moisturizer for face, hands and body enriched with vitamin E and jojoba oil, absorbed quickly for soft, smooth skin.",
        category: "skincare",
        brand: "Nivea",
        images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800"],
        price: 420,
        stock: 70,
        tags: ["moisturizer", "body care"],
    },
    {
        name: "Sunsilk Black Shine Shampoo",
        slug: "sunsilk-black-shine-shampoo",
        description:
            "Nourishing shampoo formulated with black seed oil to strengthen strands and leave hair with brilliant natural shine.",
        category: "haircare",
        brand: "Sunsilk",
        images: ["https://images.unsplash.com/photo-1591019479261-16d4a1d0b199?w=800"],
        price: 380,
        compareAtPrice: 420,
        stock: 45,
        isOnSale: true,
        tags: ["shampoo", "hair care"],
    },
    {
        name: "Zara Rose Gold Eau de Parfum",
        slug: "zara-rose-gold-edp",
        description:
            "A warm floral fragrance with notes of rose, vanilla and amber musk designed for everyday elegance.",
        category: "fragrance",
        brand: "Zara",
        images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800"],
        price: 1450,
        stock: 22,
        isFeatured: true,
        tags: ["perfume", "eau de parfum"],
    },
    {
        name: "Innisfree Green Tea Hyaluronic Toner",
        slug: "innisfree-green-tea-toner",
        description:
            "Lightweight hydrating toner with green tea extract and hyaluronic acid to soothe and replenish skin moisture.",
        category: "skincare",
        brand: "Innisfree",
        images: ["https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800"],
        price: 720,
        compareAtPrice: 800,
        stock: 30,
        isOnSale: true,
        tags: ["toner", "hydration"],
    },
    {
        name: "Wet n Wild MegaSlicks Lip Gloss",
        slug: "wet-n-wild-megaslicks-lip-gloss",
        description:
            "High-shine, non-sticky lip gloss with a lightweight formula that glides on smooth for a plumped, glassy finish.",
        category: "cosmetics",
        brand: "Wet n Wild",
        images: ["https://images.unsplash.com/photo-1631214524115-75cf39b9e414?w=800"],
        price: 280,
        stock: 55,
        tags: ["lip gloss", "makeup"],
    },
    {
        name: "Himalaya Ashwagandha Wellness Capsules",
        slug: "himalaya-ashwagandha-capsules",
        description:
            "Herbal supplement traditionally used to help the body manage everyday stress and support overall vitality.",
        category: "wellness",
        brand: "Himalaya",
        images: ["https://images.unsplash.com/photo-1584362917165-526a968579a8?w=800"],
        price: 540,
        stock: 40,
        tags: ["supplement", "wellness"],
    },
];

async function run() {
    await connectDB();
    console.log("Clearing existing products...");
    await Product.deleteMany({});
    console.log("Inserting seed products...");
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully.`);
    await mongoose.disconnect();
    process.exit(0);
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
