import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './OrderHistory.css';

const OrderHistory = () => {
    // NEW: Lấy state và hàm từ StoreContext
    const {
        orderHistory,
        orderLoading,
        orderError,
        orderSearchQuery,
        setOrderSearchQuery,
        orderFilterStatus,
        setOrderFilterStatus,
        url
    } = useContext(StoreContext);

    const handleSearchChange = (e) => {
        setOrderSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setOrderFilterStatus(e.target.value);
    };

    return (
        <div className="order-history-page">
            <h2>Lịch Sử Đơn Hàng Của Tôi</h2>

            <div className="order-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo mã đơn hàng..."
                    value={orderSearchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <select value={orderFilterStatus} onChange={handleFilterChange} className="filter-select">
                    <option value="all">Tất cả</option>
                    <option value="Food Processing">Đang xử lý</option>
                    <option value="Out For Delivery">Đang giao hàng</option>
                    <option value="Delivered">Đã giao hàng</option>
                    <option value="Canceled">Đã hủy</option>
                </select>
            </div>

            {orderLoading ? (
                <p className="loading-message">Đang tải lịch sử đơn hàng...</p>
            ) : orderError ? (
                <p className="error-message">{orderError}</p>
            ) : orderHistory.length > 0 ? (
                <div className="orders-list">
                    {orderHistory.map((order) => (
                        <div key={order._id} className="order-item-card">
                            <div className="card-header">
                                <p><strong>Mã Đơn Hàng:</strong> {order._id}</p>
                                <p><strong>Ngày:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="card-body">
                                <p><strong>Trạng thái:</strong> <span className={`status-tag status-${order.status}`}>{order.status}</span></p>
                                <p><strong>Tổng cộng:</strong> ${order.amount}</p>
                                <div className="item-list">
                                    <strong>Các món:</strong>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>{item.name} x {item.quantity}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-orders">Bạn chưa có đơn hàng nào.</p>
            )}
        </div>
    );
};

export default OrderHistory;
