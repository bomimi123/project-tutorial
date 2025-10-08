import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import path from "path";
import dotenv from 'dotenv';

import foodRouter from "./routes/foodRoute.js";

import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import emailRouter from "./routes/emailRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";
import couponRouter from "./routes/couponRoute.js";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

// Api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", emailRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/user", userRouter)

// Serve images
app.use("/images", express.static(path.join(__dirname, "uploads", "images")));

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server Started On http://localhost:${port}`);
});

// Log environment variables to check
console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
console.log(`STRIPE_SECRET_KEY: ${process.env.STRIPE_SECRET_KEY}`);
