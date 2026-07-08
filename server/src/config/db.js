const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
    if (isConnected) return mongoose.connection;

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error(
            "MONGODB_URI is not set in .env"
        );
    }

    mongoose.set("strictQuery", true);

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;

    mongoose.connection.on("disconnected", () => {
        isConnected = false;
        console.warn("MongoDB disconnected");
    });

    console.log(`MongoDB connected: ${mongoose.connection.host}`);
    return mongoose.connection;
}

module.exports = connectDB;
