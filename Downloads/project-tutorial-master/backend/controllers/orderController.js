// backend/controllers/orderController.js

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js"; 
import couponModel from "../models/couponModel.js"; 
import Stripe from "stripe";
import { updateDashboardMetrics } from "./dashboardController.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ==============================
// HÀM 1: TẠO ĐƠN HÀNG (PLACE ORDER)
// ==============================
const placeOrder = async (req, res) => {
    let items = [];

    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData || Object.keys(userData.cartData).length === 0) {
            return res.json({ success: false, message: "Cart is empty" });
        }

        for (const itemId in userData.cartData) {
            if (userData.cartData[itemId] > 0) {
                const foodItem = await foodModel.findById(itemId);
                if (foodItem) {
                    items.push({
                        foodId: itemId,
                        name: foodItem.name,
                        price: foodItem.price,
                        quantity: userData.cartData[itemId],
                    });
                }
            }
        }

        if (items.length === 0) {
            return res.json({ success: false, message: "No valid items found in cart" });
        }

        // Nếu có coupon thì kiểm tra
        let couponData = null;
        if (req.body.couponId) {
            couponData = await couponModel.findById(req.body.couponId);
            if (!couponData) {
                return res.json({ success: false, message: "Invalid coupon" });
            }
            if (couponData.status === "disabled" || couponData.current_usage >= couponData.max_usage) {
                return res.json({ success: false, message: "Coupon is no longer valid" });
            }
        }

        const newOrder = new orderModel({
            userId: req.body.userId,
            items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false,
            couponId: couponData ? couponData._id : null,
            couponCode: couponData ? couponData.code : null,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        return res.json({
            success: true,
            orderId: newOrder._id,
            message: "Order placed successfully"
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error processing order" });
    }
};

// ==============================
// HÀM 2: XÁC MINH THANH TOÁN
// ==============================
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ==============================
// HÀM 3: XEM ĐƠN HÀNG CỦA USER
// ==============================
const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { status, search } = req.query;

        let query = { userId };

        if (status && status !== "all") {
            query.status = status;
        }

        if (search && orderModel.base.Types.ObjectId.isValid(search)) {
            query._id = search;
        }

        const orders = await orderModel.find(query).sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ==============================
// HÀM 4: XEM TẤT CẢ ĐƠN HÀNG (ADMIN)
// ==============================
const listOrders = async (req, res) => {
    try {
        const { status, search } = req.query;
        let query = {};

        if (status && status !== "all") {
            query.status = status;
        }

        if (search && orderModel.base.Types.ObjectId.isValid(search)) {
            query._id = search;
        }

        const orders = await orderModel.find(query).populate("userId").sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ==============================
// HÀM 5: CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
// ==============================
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        order.status = status;
        await order.save();

        let updatedCoupon = null;

        // Nếu đơn hàng hoàn thành → cập nhật Dashboard + Coupon
        if (status && status.toLowerCase().includes("completed")) {
            await updateDashboardMetrics();

            if (order.couponId) {
                const coupon = await couponModel.findById(order.couponId);
                if (coupon) {
                    if (coupon.current_usage < coupon.max_usage) {
                        coupon.current_usage += 1;

                        if (coupon.current_usage >= coupon.max_usage) {
                            coupon.status = "exhausted"; // đánh dấu đã dùng hết
                        }

                        updatedCoupon = await coupon.save();
                        console.log(`✅ Coupon ${coupon.code}: ${coupon.current_usage}/${coupon.max_usage}`);
                    } else {
                        console.log(`⚠️ Coupon ${coupon.code} đã hết lượt dùng`);
                    }
                }
            }
        }

        res.json({ 
            success: true, 
            message: "Status Updated", 
            order, 
            coupon: updatedCoupon 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
