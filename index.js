require("dotenv").config();
const express = require("express");

const userRoutes = require("./router/userRoutes");

const app = express();

const cors = require("cors");
const connectDB = require("./config/db");

connectDB();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
