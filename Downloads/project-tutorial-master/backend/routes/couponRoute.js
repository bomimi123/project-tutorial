// backend/routes/couponRoute.js (CẦN CẬP NHẬT)
import express from 'express';
// Đổi listCoupon thành listAdminCoupons
import { createCoupon, listAdminCoupons, listPublicCoupons, removeCoupon,applyCoupon } from '../controllers/couponController.js'; 
import adminMiddleware from '../middleware/admin.js';

const couponRouter = express.Router();

// ADMIN ROUTES
couponRouter.post("/create", adminMiddleware, createCoupon);
couponRouter.get("/list", adminMiddleware, listAdminCoupons); // Dùng listAdminCoupons
couponRouter.post("/remove", adminMiddleware, removeCoupon);

// 🛑 PUBLIC ROUTE CHO FRONTEND CLIENT
couponRouter.get("/list/public", listPublicCoupons);
couponRouter.post("/validate", applyCoupon); 


export default couponRouter;