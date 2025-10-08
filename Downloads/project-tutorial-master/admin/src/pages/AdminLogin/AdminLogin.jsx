import React, { useState, useContext } from 'react';
// ĐIỀU CHỈNH ĐƯỜNG DẪN IMPORT CSS (Giả định vị trí đã đúng)
import './AdminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// ĐIỀU CHỈNH ĐƯỜNG DẪN IMPORT CONTEXT (Giả định vị trí đã đúng)
import { StoreContext } from '../../context/StoreContext';

const AdminLogin = () => {
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({ email: "", password: "" });

    const onChangeHandler = (e) => {
        setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            // URL đã được sửa để khớp với Backend: /api/user/admin/login
            let response = await axios.post(url + "/api/user/admin/login", data);

            if (response.data.success) {
                const { token } = response.data;

                // 🛑 Lưu Token Admin bằng khóa "token" để đồng bộ với người dùng thông thường
                localStorage.setItem("token", token);

                toast.success("Đăng nhập Admin thành công!");
                setTimeout(() => navigate('/admin-dashboard'), 1500);
            } else {
                toast.error(response.data.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            // Cung cấp thêm chi tiết nếu lỗi 404
            if (error.response && error.response.status === 404) {
                toast.error("Lỗi 404: Không tìm thấy Route. Kiểm tra userRoute.js.");
            } else {
                toast.error("Lỗi kết nối tới server. Vui lòng thử lại sau.");
            }
        }
    };


    return (
        <div className="admin-login-container">
            <form onSubmit={onLogin} className="admin-login-form">
                <h2>Đăng nhập Quản trị Viên</h2>
                <input
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email Admin"
                    required
                />
                <input
                    name="password"
                    onChange={onChangeHandler}
                    value={data.password}
                    type="password"
                    placeholder="Mật khẩu"
                    required
                />
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default AdminLogin;
