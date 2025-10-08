import express from 'express';
import { 
    getRevenue,
    getTopSellingProducts,
    getTopCustomers,
    getOrdersStatusMetrics,
    getDashboardSummary
} from '../controllers/dashboardController.js';

import authMiddleware from '../middleware/auth.js';

const dashboardRouter = express.Router();


dashboardRouter.get("/revenue", authMiddleware, getRevenue);
dashboardRouter.get("/top-products", authMiddleware, getTopSellingProducts);
dashboardRouter.get("/top-customers", authMiddleware, getTopCustomers);
dashboardRouter.get("/status-metrics", authMiddleware, getOrdersStatusMetrics);
dashboardRouter.get("/summary", authMiddleware, getDashboardSummary);

export default dashboardRouter;
