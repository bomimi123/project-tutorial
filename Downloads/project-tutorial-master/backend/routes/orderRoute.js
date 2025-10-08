import express from "express";
import authMiddleware from "../middleware/auth.js";
import { 
    placeOrder, 
    userOrders, 
    verifyOrder, 
    listOrders, 
    updateStatus 
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// User đặt hàng
orderRouter.post("/place", authMiddleware, placeOrder);

// Xác minh thanh toán
orderRouter.post("/verify", verifyOrder);

// Lấy đơn hàng của user
orderRouter.get("/userorders", authMiddleware, userOrders);

// Admin: xem tất cả đơn hàng
orderRouter.get("/list", authMiddleware, listOrders);

// Admin: cập nhật trạng thái đơn hàng (khi Completed thì coupon cũng cập nhật)
orderRouter.post("/update-status", authMiddleware, updateStatus);

export default orderRouter;
