import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { StoreContext } from '../../context/StoreContext';
import './AdminDashboard.css';

const INITIAL_LIMIT = 4;

const AdminDashboard = () => {
    // 1. STATE & CONTEXT
    const [isTopProductsExpanded, setIsTopProductsExpanded] = useState(false);

    const {
        url,
        token,
        dashboardData,
        dashboardLoading,
        dashboardError,
        fetchDashboardData
    } = useContext(StoreContext);

    // 2. LIFECYCLE & EFFECT
    useEffect(() => {
        if (token) {
            fetchDashboardData();
        }
    }, [token, fetchDashboardData]);

    // 3. LOGIC XỬ LÝ DỮ LIỆU
    const data = dashboardData || {};
    const {
        revenueData = [],
        topProducts = [],
        topCustomers = [],
        statusMetric = {},
        globalSummary = { totalRevenue: 0, totalCompletedOrders: 0 },
    } = data;
    const { totalOrders = 0, metrics = [] } = statusMetric;

    const { totalRevenue, totalCompletedOrders } = globalSummary;

    // Hàm chuyển đổi trạng thái mở rộng/thu gọn
    const toggleTopProducts = () => {
        setIsTopProductsExpanded(prev => !prev);
    };

    // Tính toán danh sách sản phẩm hiển thị dựa trên trạng thái (Tối ưu hóa)
    const displayProducts = useMemo(() => {
        // Lọc sản phẩm bán được >= 5
        const filtered = topProducts.filter(item => item.totalQuantity >= 5);

        return isTopProductsExpanded
            ? filtered
            : filtered.slice(0, INITIAL_LIMIT);
    }, [isTopProductsExpanded, topProducts]);

    // 4. HÀM HỖ TRỢ HIỂN THỊ
    const getRankColor = (index) => {
        const colors = ['#8e44ad', '#3498db', '#e67e22', '#f1c40f', '#2ecc71', '#c0392b', '#7f8c8d', '#2c3e50'];
        return colors[index % colors.length];
    };

    const formatCurrency = (amount) => {
        if (typeof amount !== 'number') return '0 VNĐ';
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    // 5. RENDERING TRẠNG THÁI
    if (dashboardLoading) {
        return <div className="admin-dashboard loading-state">
            <p className="dashboard-loading">Đang tải dữ liệu...</p>
        </div>;
    }

    if (dashboardError) {
        return <div className="admin-dashboard error-state">
            <p className="dashboard-error">{dashboardError}</p>
        </div>;
    }

    // 6. RENDER CHÍNH
    return (
        <div className="admin-dashboard">
            <h2 className="dashboard-title">Bảng Điều Khiển & Thống Kê</h2>

            {/* 1. TOP METRIC CARDS */}
            <div className="metric-cards-grid">
                {/* THẺ 1: TỔNG DOANH THU HOÀN THÀNH */}
                <div className="metric-card global-revenue-card">
                    <h4>💰 Tổng Doanh thu (Hoàn thành)</h4>
                    <p className="metric-value">{formatCurrency(totalRevenue)}</p>
                </div>

                {/* THẺ 2: TỔNG ĐƠN HÀNG HOÀN THÀNH */}
                <div className="metric-card completed-orders-card">
                    <h4>✅ Đơn hàng Hoàn thành</h4>
                    <p className="metric-value">{totalCompletedOrders}</p>
                </div>

                {/* THẺ 3: TỔNG ĐƠN HÀNG */}
                <div className="metric-card order-card">
                    <h4>Tổng Đơn hàng (Tất cả)</h4>
                    <p className="metric-value">{totalOrders}</p>
                </div>

                {/* THẺ 4: ID Phiên */}
                <div className="metric-card session-card">
                    <h4>ID Phiên làm việc (Admin)</h4>
                    <p className="metric-value">{token ? token.substring(0, 8) + '...' : 'N/A'}</p>
                </div>
            </div>

            {/* 2. MAIN CONTENT */}
            <div className="dashboard-main-content">

                {/* 2a. Sản phẩm bán chạy nhất */}
                <div className="dashboard-section section-top-products">
                    <h3>
                        <i className="fas fa-box-open"></i>
                        Sản phẩm bán chạy nhất 
                    </h3>

                    <ul className="top-list product-list">
                        {displayProducts.length > 0 ? (
                            displayProducts.map((item, index) => (
                                <li key={index}>
                                    <div className="product-rank" style={{ backgroundColor: getRankColor(index) }}>
                                        {index + 1}
                                    </div>
                                    <div className="product-info">
                                        <span className="product-name">{item.name}</span>
                                        <span className="product-price">{formatCurrency(item.price)}</span>
                                    </div>
                                    <span className="item-quantity">Đã bán: {item.totalQuantity}</span>
                                </li>
                            ))
                        ) : (
                            <p className="no-data">Không có dữ liệu sản phẩm bán chạy (≥ 5).</p>
                        )}
                    </ul>

                    {/* NÚT XEM THÊM/THU GỌN */}
                    {topProducts.filter(item => item.totalQuantity >= 5).length > INITIAL_LIMIT && (
                        <button className="expand-collapse-btn" onClick={toggleTopProducts}>
                            {isTopProductsExpanded ? 'Thu gọn' : 'Xem thêm'}
                            <i className={`fas ${isTopProductsExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} collapse-icon`}></i>
                        </button>
                    )}
                </div>

                {/* 2b. Khách hàng order nhiều nhất */}
                <div className="dashboard-section section-top-customers">
                    <h3><i className="fas fa-user-friends"></i> Khách hàng order nhiều nhất ({topCustomers.length})</h3>
                    <ul className="top-list customer-list">
                        {topCustomers.length > 0 ? (
                            topCustomers.map((customer, index) => (
                                <li key={index}>
                                    <div className="customer-details">
                                        <div className="rank-badge" style={{ backgroundColor: getRankColor(index) }}>
                                            R{index + 1}
                                        </div>
                                        <div>
                                            <span className="customer-email">{customer.email}</span>
                                        </div>
                                    </div>
                                    <div className="customer-metrics">
                                        <span className="customer-orders">Đơn: {customer.totalOrders}</span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="no-data">Không có dữ liệu khách hàng. (Cần có đơn hàng)</p>
                        )}
                    </ul>
                </div>

                {/* 2c. Tình hình đơn hàng */}
                <div className="dashboard-section section-order-status section-full-width">
                    <h3>📦 Tình hình đơn hàng</h3>
                    <div className="status-grid">
                        {metrics.map((metric, index) => (
                            <div key={index}
                                className="status-card"
                                style={{ borderLeft: `5px solid ${getRankColor(index)}` }}
                            >
                                <h4>{metric.status}</h4>
                                <p>{metric.count}</p>
                                <p className="ratio">Tỷ lệ: {totalOrders > 0 ? ((metric.count / totalOrders) * 100).toFixed(2) : '0.00'}%</p>
                            </div>
                        ))}
                        <div className="status-card total-card">
                            <h4>Tổng đơn hàng</h4>
                            <p>{totalOrders}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
