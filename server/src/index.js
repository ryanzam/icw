require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoute");

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.use("/api/products", productRoutes)

const PORT = process.env.PORT || 4000;

async function start() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`API listening on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
}

start();

module.exports = app;