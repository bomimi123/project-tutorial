import axios from "axios";
import { toast } from "react-toastify";
import React, { createContext, useState, useEffect, useCallback } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [token, setToken] = useState("");
    const [users, setUsers] = useState([]);
    const url = "http://localhost:4000";

    const [dashboardData, setDashboardData] = useState({
        revenueData: [],
        topProducts: [],
        topCustomers: [],
        statusMetric: { totalOrders: 0, metrics: [] },
        globalSummary: { totalRevenue: 0, totalCompletedOrders: 0 }, 
    });

    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [dashboardError, setDashboardError] = useState(null);

    // 1. API Dashboard (Sử dụng useCallback và Promise.all để tối ưu hóa fetching)
    const fetchDashboardData = useCallback(async () => {
        if (!token) {
            setDashboardError("Authentication token is missing.");
            setDashboardLoading(false);
            return;
        }

        setDashboardLoading(true);
        setDashboardError(null);
        
        let combinedData = {
            revenueData: [],
            topProducts: [],
            topCustomers: [],
            statusMetric: { totalOrders: 0, metrics: [] },
            globalSummary: { totalRevenue: 0, totalCompletedOrders: 0 },
        };

        try {
            const [
                revenueRes,
                topProductsRes,
                topCustomersRes,
                statusMetricRes,
                summaryRes, 
            ] = await Promise.all([
                axios.get(`${url}/api/dashboard/revenue?timeRange=week`, { headers: { token } }),
                axios.get(`${url}/api/dashboard/top-products`, { headers: { token } }),
                axios.get(`${url}/api/dashboard/top-customers`, { headers: { token } }),
                axios.get(`${url}/api/dashboard/status-metrics`, { headers: { token } }),
                axios.get(`${url}/api/dashboard/summary`, { headers: { token } }), 
            ]);

            // Xử lý dữ liệu Global Summary MỚI
            if (summaryRes.data.success) {
                combinedData.globalSummary = { 
                    totalRevenue: summaryRes.data.data.totalRevenue,
                    totalCompletedOrders: summaryRes.data.data.totalCompletedOrders,
                };
            } else {
                toast.error("Lỗi tải Tóm tắt Dashboard.");
            }

            // Xử lý dữ liệu Doanh thu (Vẫn cần để vẽ biểu đồ theo tuần/tháng)
            if (revenueRes.data.success) {
                combinedData.revenueData = revenueRes.data.data;
            } else {
                toast.error("Lỗi tải Doanh thu.");
            }

            // Xử lý Top Products
            if (topProductsRes.data.success) {
                combinedData.topProducts = topProductsRes.data.data;
            } else {
                toast.error("Lỗi tải Sản phẩm bán chạy.");
            }

            // Xử lý Top Customers
            if (topCustomersRes.data.success) {
                combinedData.topCustomers = topCustomersRes.data.data;
            } else {
                toast.error("Lỗi tải Khách hàng tiềm năng.");
            }

            // Xử lý Status Metrics
            if (statusMetricRes.data.success) {
                combinedData.statusMetric = {
                    totalOrders: statusMetricRes.data.data.totalOrders,
                    metrics: statusMetricRes.data.data.statusMetrics,
                };
            } else {
                toast.error("Lỗi tải Tình hình đơn hàng.");
            }
            
            setDashboardData(combinedData);
            
        } catch (error) {
            console.error("Dashboard fetch error:", error);
            setDashboardError("Lỗi kết nối khi tải dữ liệu dashboard.");
            toast.error("Lỗi kết nối tới máy chủ.");
        } finally {
            setDashboardLoading(false);
        }
    }, [token, url]);


    // 2. API User - Giữ nguyên các hàm fetchUsers, deleteUser, fetchUserOrders, updateUser
    const fetchUsers = useCallback(async () => { 
        try {
            const response = await axios.get(`${url}/api/user/list`, {
                headers: { token },
            });
            if (response.data.success) {
                setUsers(response.data.data);
            } else {
                toast.error("Không thể tải danh sách người dùng.");
            }
        } catch (error) {
            toast.error("Không thể kết nối đến máy chủ.");
            console.error(error);
        }
    }, [token, url]);

    const deleteUser = useCallback(async (userId) => { 
        try {
            const response = await axios.post(
                `${url}/api/user/delete`,
                { id: userId },
                { headers: { token } }
            );
            if (response.data.success) {
                toast.success("Xóa người dùng thành công.");
                return true;
            } else {
                toast.error("Xóa người dùng thất bại.");
                return false;
            }
        } catch (error) {
            toast.error("Không thể kết nối tới máy chủ để xóa người dùng.");
            console.log(error);
            return false;
        }
    }, [token, url]);

    const fetchUserOrders = useCallback(async (userId) => { 
        try {
            const response = await axios.get(`${url}/api/user/orders/${userId}`, {
                headers: { token },
            });
            if (response.data.success) {
                return response.data.data;
            } else {
                toast.error("Không thể tải lịch sử đơn hàng.");
                return [];
            }
        } catch (error) {
            toast.error("Không thể kết nối tới máy chủ.");
            console.log(error);
            return [];
        }
    }, [token, url]);

    const updateUser = useCallback(async (userId, userData) => { 
        try {
            const response = await axios.post(`${url}/api/user/update/${userId}`, userData,
                {
                    headers: { token },
                });
            if (response.data.success) {
                toast.success("Cập nhật người dùng thành công.");
                fetchUsers();
                return true;
            } else {
                toast.error("Cập nhật người dùng thất bại ");
                return false;
            }
        } catch (error) {
            toast.error("Không thể kết nối tới máy chủ.");
            console.log(error);
            return [];
        }
    }, [token, url, fetchUsers]); 


    // Load token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    const contextValue = {
        url,
        token,
        setToken,
        users,
        fetchUsers,
        deleteUser,
        fetchUserOrders,
        updateUser,
        dashboardData,
        dashboardLoading,
        dashboardError,
        fetchDashboardData 
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;