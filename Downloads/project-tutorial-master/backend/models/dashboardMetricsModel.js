

import mongoose from "mongoose";

const dashboardMetricSchema = new mongoose.Schema ({

    metricId : {
        type:String,
        required: true,
        unique: true,
        default: "global_summary"
    },

    // tong danh thu tu cac don hang da hoan thanh
    totalRevenue: {
        type: Number,
        default: 0
    },

    // tong so don da hoan thanh
    totalCompletedOrders: { 
        type:Number,
        default: 0
    },

    // ngay gio cap nhat cuoi cung ( giup admin biet so lieu moi nhat)
    lastUpdated: {
        type:Date,
        default: Date.now
    }
});

// 💡 LƯU Ý: Đảm bảo tên Model thống nhất (ví dụ: DashboardMetric)
const DashboardMetricModel = mongoose.models.DashboardMetric || mongoose.model ("DashboardMetric", dashboardMetricSchema);

export default DashboardMetricModel;