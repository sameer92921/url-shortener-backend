const express = require("express");
const urlRoutes = require('./routes/url');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");

// DB Connection
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Successfully connected to DB");
    } catch (err) {
        console.error("❌ DB connection failed:", err);
    }
}
main();

const server = express();
server.use(express.json());
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',  // Frontend URL
    credentials: true,
};

server.use(cors(corsOptions));
server.use('/', urlRoutes);


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`\n\n🚀 Server is running at http://localhost:${PORT}\n`);
});