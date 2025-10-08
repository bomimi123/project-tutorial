// backend/controllers/dashboardController.js

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
// IMPORT Model mới để lưu trữ dữ liệu Dashboard tổng hợp
import DashboardMetricModel from "../models/dashboardMetricsModel.js";


/**
 * Tính toán và lưu trữ các chỉ số Dashboard tổng hợp (Total Revenue, Total Orders Completed).
 * Hàm này được gọi từ orderController khi một đơn hàng chuyển sang trạng thái "Order Completed".
 */
const updateDashboardMetrics = async () => { 
    try {
        console.log("Starting Dashboard Metrics recalculation and saving...");
        
        // 1. TÍNH TOÁN CÁC CHỈ SỐ TỔNG HỢP TỪ DB
        const revenueResult = await orderModel.aggregate([
            // Chỉ tính những đơn hàng đã HOÀN THÀNH và ĐÃ THANH TOÁN (payment: true là tùy chọn)
           { $match: { status: "Order Completed" } },
            { $group: {
                _id: null,
                totalRevenue: { $sum: "$amount" },
                totalCompletedOrders: { $sum: 1 }
            } }
        ]);

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
        const totalCompletedOrders = revenueResult.length > 0 ? revenueResult[0].totalCompletedOrders : 0;

        // 2. LƯU (UPSERT) CÁC CHỈ SỐ VÀO MODEL RIÊNG
        const savedMetrics = await DashboardMetricModel.findOneAndUpdate(
            { metricId: "global_summary" }, 
            { 
                totalRevenue: totalRevenue,
        totalCompletedOrders: totalCompletedOrders,
                lastUpdated: new Date() // Ghi lại thời điểm cập nhật
            },
            { upsert: true, new: true } // Upsert: tạo mới nếu chưa có; new: trả về tài liệu mới
        );

        console.log("Dashboard Metrics updated successfully and saved to DB.", savedMetrics);

    } catch (error) {
        console.error("Error during updateDashboardMetrics and saving to DB:", error);
    }
};

// =======================================================
// API 2: GET ĐỂ ADMIN DASHBOARD ĐỌC DỮ LIỆU TỔNG HỢP 
// =======================================================
/**
 * API GET để AdminDashboard có thể truy vấn các chỉ số tổng hợp
 * Route: GET /api/dashboard/summary
 */
const getDashboardSummary = async (req, res) => {
    try {
        // Lấy record tổng hợp duy nhất
        const summaryData = await DashboardMetricModel.findOne({ metricId: "global_summary" });

        if (summaryData) {
            // Chỉ trả về 2 trường cần thiết cho Frontend
            res.json({ 
                success: true, 
                data: {
                    totalRevenue: summaryData.totalRevenue,
                    totalCompletedOrders: summaryData.totalCompletedOrders,
                }
            });
        } else {
            // Trường hợp chưa có record nào được tạo (chưa có đơn hàng hoàn thành)
            res.json({ success: true, data: { 
                totalRevenue: 0, 
                totalCompletedOrders: 0,
            }});
        }

    } catch (error) {
        console.error("Error fetching dashboard summary:", error);
        res.json({ success: false, message: "Error fetching dashboard summary" });
    }
}


// =======================================================
// API 3: DOANH THU THEO KỲ
// =======================================================

const getRevenue = async (req, res) => {
    try {
        const { timeRange } = req.query;
        let groupState = {};
        let projectStage = {};
        
        // CÁC LOGIC GROUP BY NGÀY/TUẦN/THÁNG/NĂM
        if (timeRange === "day" || !timeRange) {
            groupState = {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalRevenue: { $sum: "$amount" }
            };
            projectStage = { date: "$_id", totalRevenue: 1, _id: 0 };
        } else if (timeRange === "week") {
            groupState = {
                _id: { $dateToString: { format: "%Y-%U", date: "$createdAt" } },
                totalRevenue: { $sum: "$amount" }
            };
            projectStage = { week: "$_id", totalRevenue: 1, _id: 0 };
        } else if (timeRange === "month") {
            groupState = {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                totalRevenue: { $sum: "$amount" }
            };
            projectStage = { month: "$_id", totalRevenue: 1, _id: 0 };
        } else if (timeRange === "year") {
            groupState = {
                _id: { $dateToString: { format: "%Y", date: "$createdAt" } },
                totalRevenue: { $sum: "$amount" }
            };
            projectStage = { year: "$_id", totalRevenue: 1, _id: 0 };
        }

        const revenueData = await orderModel.aggregate([
            // CHỈ TÍNH DOANH THU TỪ ĐƠN HÀNG ĐÃ HOÀN THÀNH
            { $match: { status: "Order Completed" } }, 
            { $group: groupState },
            { $sort: { _id: 1 } },
            { $project: projectStage }
        ]);

        res.json({ success: true, data: revenueData });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching revenue data" });
    }
};

// =======================================================
// API 4: SẢN PHẨM BÁN CHẠY NHẤT (ĐÃ FIX LOOKUP & PROJECT)
// =======================================================

const getTopSellingProducts = async (req, res) => {
    try {
        const topProducts = await orderModel.aggregate([
            { $match: { status: "Order Completed" } },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.foodId",
                    totalQuantity: { $sum: "$items.quantity" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 8 },

            // Chuyển sang ObjectId để lookup sang bảng foods
            {
                $addFields: {
                    foodObjId: { $toObjectId: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "foods",             // tên collection trong MongoDB
                    localField: "foodObjId",
                    foreignField: "_id",
                    as: "foodDetails"
                }
            },
            { $unwind: "$foodDetails" },
            {
                $project: {
                    _id: 0,
                    foodId: "$_id",
                    totalQuantity: 1,
                    name: "$foodDetails.name",
                    price: "$foodDetails.price"
                }
            }
        ]);

        res.json({ success: true, data: topProducts });
    } catch (error) {
        console.error("Aggregation Error in getTopSellingProducts:", error);
        res.status(500).json({ success: false, message: "Error fetching top selling products!" });
    }
};


// =======================================================
// API 5: KHÁCH HÀNG ORDER NHIỀU NHẤT (ĐÃ FIX LOOKUP & PROJECT)
// =======================================================

const getTopCustomers = async (req, res) => {
   try {
        const topCustomers = await orderModel.aggregate([
            { $match: { status: "Order Completed" } },
            {
                $group: {
                    _id: "$userId", 
                    totalOrders: { $sum: 1 }, 
                }
            },
            { $sort: { totalOrders: -1 } },
            { $limit: 8 },
            
            // 💡 FIX 2: CHUYỂN ĐỔI KIỂU DỮ LIỆU ĐỂ LOOKUP
            {
                $addFields: {
                    convertedUserId: { $toObjectId: "$_id" } // Chuyển String userId sang ObjectId
                }
            },
            
            {
                $lookup: {
                    from: 'users', 
                    localField: 'convertedUserId', // SỬ DỤNG TRƯỜNG ĐÃ CHUYỂN ĐỔI
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    _id: 0,
                    email: "$userDetails.email",
                    totalOrders: 1
                }
            }
        ]);

        res.json({ success: true, data: topCustomers });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching top customers!" });
    }
};

// =======================================================
// API 6: TÌNH HÌNH ĐƠN HÀNG THEO STATUS
// =======================================================

const getOrdersStatusMetrics = async (req, res) => {
    try {
        const statusMetrics = await orderModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    status: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        const totalOrders = await orderModel.countDocuments();

        res.json({ success: true, data: { statusMetrics, totalOrders } });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching order status metrics" });
    }
};

export {
    getRevenue,
    getTopSellingProducts,
    getTopCustomers,
    getOrdersStatusMetrics,
    updateDashboardMetrics, 
    getDashboardSummary, 
};