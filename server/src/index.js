const express = require("express");
const cors = require("cors");

const app = express()

const PORT = process.env.PORT || 4000;

async function start() {
    try {
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