import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🛑 IMPORT MỚI
import AdminLogin from './pages/AdminLogin/AdminLogin'; 

// IMPORT CÁC COMPONENT ADMIN ĐÃ CÓ
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import UserManagement from './pages/UserManagement/UserManagement'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Coupon from './pages/Coupon/Coupon'


// Component bao bọc giao diện Admin (Giao diện cũ của App.jsx)
const AdminLayout = ({ url }) => {
    return (
        <>
            <Navbar />
            <hr />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    {/* Đổi /admin-dashboard thành route mặc định nếu cần */}
                    <Route path='/admin-dashboard' element={<AdminDashboard />} /> 
                    <Route path="/add" element={<Add url={url} />} />
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/order" element={<Order url={url} />} />
                    <Route path='/user-management' element={<UserManagement />} />
                    <Route path='/coupon' element={<Coupon />} />
                    {/* Thêm route mặc định nếu người dùng truy cập /admin-path */}
                    <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                </Routes>
            </div>
        </>
    );
}

const App = () => {
    const url = "http://localhost:4000";
    // 🛑 QUAN TRỌNG: Lấy Token Admin RIÊNG BIỆT
    const adminToken = localStorage.getItem('token'); 

    return (
        <div>
            <ToastContainer />
            <Routes >
                {/* 1. ROUTE ĐĂNG NHẬP ADMIN */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* 2. CÁC ROUTE ADMIN ĐƯỢC BẢO VỆ */}
                {adminToken ? (
                    // Nếu có Token, hiển thị Admin Layout
                    <Route path="/*" element={<AdminLayout url={url} />} />
                ) : (
                    // Nếu không có Token, bất kỳ route nào khác sẽ chuyển hướng về Login Admin
                    <Route path="/*" element={<Navigate to="/admin/login" />} />
                )}
            </Routes>
        </div>
    )
}

export default App;