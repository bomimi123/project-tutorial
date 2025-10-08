import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import adminAxios from '../../api/adminApi'; 
import './Coupon.css'; 
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const CouponManager = () => {
    const {url, token } = useContext(StoreContext)

    // State cho danh sách mã giảm giá
    const [couponList, setCouponList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State cho form tạo/chỉnh sửa
    const [couponData, setCouponData] = useState({
        code: '',
        type: 'percentage', // percentage | fixed_amount
        value: '',
        max_usage: '', // Mặc định 100 lần sử dụng
        min_order_value: '0', // Mặc định 0
        expiry_date: '',
    });

    // Hàm lấy danh sách mã giảm giá (Dùng cho Admin)
    const fetchCoupons = async () => {
        // Kiểm tra để tránh gọi API nếu chưa có token (dù App.jsx đã chặn)
        if (!localStorage.getItem('token')) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // 🛑 CẬP NHẬT: Dùng adminAxios. Nó tự động đính kèm token.
            // Endpoint Admin: /api/coupon/list
            const response = await adminAxios.get(`/api/coupon/list`);

            if (response.data.success) {
                setCouponList(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi phân quyền nếu Interceptor chưa chuyển hướng
            toast.error("Lỗi khi tải danh sách mã giảm giá. (Kiểm tra quyền Admin)");
        } finally {
            setLoading(false);
        }
    };
    
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCouponData(prevData => ({ ...prevData, [name]: value }));
    };

    // Hàm định dạng ngày thành YYYY-MM-DD (cho input type="date")
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
    };

    // HÀM XỬ LÝ TẠO MÃ GIẢM GIÁ MỚI
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        if (!localStorage.getItem('token')) {
            toast.error("Vui lòng đăng nhập Admin.");
            return;
        }

        try {
            // 🛑 CẬP NHẬT: Dùng adminAxios
            // const response = await adminAxios.post(`${url}api/coupon/create`, couponData);

            let response = await adminAxios.post(url + "/api/coupon/create", couponData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                // Reset form sau khi tạo thành công
                setCouponData({
                    code: '',
                    type: 'percentage',
                    value: '',
                    max_usage: '100',
                    min_order_value: '0',
                    expiry_date: ''
                });
                fetchCoupons(); // Tải lại danh sách
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error("Lỗi hệ thống khi tạo mã giảm giá.");
        }
    };
    
    // HÀM XÓA MÃ GIẢM GIÁ
    const removeCoupon = async (couponId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa mã giảm giá này không?")) return;
        
        if (!localStorage.getItem('token')) {
            toast.error("Vui lòng đăng nhập Admin.");
            return;
        }

        try {
            // 🛑 CẬP NHẬT: Dùng adminAxios
            const response = await adminAxios.post(`/api/coupon/remove`, { id: couponId });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchCoupons(); // Tải lại danh sách
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi xóa mã giảm giá.");
        }
    };
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchCoupons();
        } else {
            setLoading(false);
        }
    }, []); // Bỏ dependency fetchCoupons để tránh re-render vô tận

    // Format tiền tệ
    const formatCurrency = (amount) => {
        if (typeof amount !== 'number') return '0 VND';
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    
    // 🛑 KIỂM TRA ĐĂNG NHẬP (Dù App.jsx đã chặn, việc này vẫn là lớp bảo vệ tốt)
    if (!localStorage.getItem('token')) {
        return <div className="coupon-manager error-state">Bạn cần đăng nhập Admin để truy cập trang này.</div>;
    }
    
    if (loading) {
        return <div className="coupon-manager loading-state">Đang tải dữ liệu...</div>;
    }
    
    return (
        <div className='coupon-manager'>
            <h2 className="manager-title">Quản lý Khuyến mãi & Mã giảm giá</h2>

            {/* PHẦN 1: TẠO MÃ GIẢM GIÁ MỚI */}
            <div className="section-form">
                <h3>Tạo Mã Giảm Giá Mới</h3>
                <form onSubmit={onSubmitHandler} className="coupon-form">
                    
                    {/* HÀNG 1: CODE & TYPE */}
                    <div className="form-group-row">
                        <div className="form-group code-input">
                            <label htmlFor="code">Mã Code *</label>
                            <input
                                onChange={onChangeHandler}
                                value={couponData.code}
                                type="text"
                                name="code"
                                id="code"
                                placeholder="VD: TET2025"
                                required
                                maxLength="15"
                            />
                        </div>
                        <div className="form-group type-select">
                            <label htmlFor="type">Loại Giảm Giá *</label>
                            <select
                                onChange={onChangeHandler}
                                value={couponData.type}
                                name="type"
                                id="type"
                            >
                                <option value="percentage">Phần trăm (%)</option>
                                <option value="fixed_amount">Số tiền cố định (VND)</option>
                            </select>
                        </div>
                    </div>

                    {/* HÀNG 2: VALUE & MAX USAGE */}
                    <div className="form-group-row">
                        <div className="form-group">
                            <label htmlFor="value">Giá trị Giảm ({couponData.type === 'percentage' ? '%' : 'VND'}) *</label>
                            <input
                                onChange={onChangeHandler}
                                value={couponData.value}
                                type="number"
                                name="value"
                                id="value"
                                min={couponData.type === 'percentage' ? "1" : "1000"}
                                max={couponData.type === 'percentage' ? "100" : undefined}
                                placeholder={couponData.type === 'percentage' ? "10 (10%)" : "50000"}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="max_usage">Số lần sử dụng Tối đa *</label>
                            <input
                                onChange={onChangeHandler}
                                value={couponData.max_usage}
                                type="number"
                                name="max_usage"
                                id="max_usage"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    {/* HÀNG 3: MIN ORDER VALUE & EXPIRY DATE */}
                    <div className="form-group-row">
                        <div className="form-group">
                            <label htmlFor="min_order_value">Đơn hàng Tối thiểu (VND)</label>
                            <input
                                onChange={onChangeHandler}
                                value={couponData.min_order_value}
                                type="number"
                                name="min_order_value"
                                id="min_order_value"
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiry_date">Ngày Hết Hạn *</label>
                            <input
                                onChange={onChangeHandler}
                                value={couponData.expiry_date}
                                type="date"
                                name="expiry_date"
                                id="expiry_date"
                                required
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="add-coupon-btn">TẠO MÃ GIẢM GIÁ</button>
                </form>
            </div>


            {/* PHẦN 2: DANH SÁCH MÃ GIẢM GIÁ */}
            <div className="section-list">
                <h3>Danh sách Mã Giảm Giá ({couponList.length})</h3>
                <div className="coupon-list-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Mã Code</th>
                                <th>Loại</th>
                                <th>Giá trị</th>
                                <th>Sử dụng</th>
                                <th>Đơn Tối thiểu</th>
                                <th>Ngày Hết hạn</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {couponList.map((item) => (
                                <tr key={item._id}>
                                    <td className="coupon-code">
                                        <strong>{item.code}</strong>
                                    </td>
                                    <td>
                                        {item.type === 'percentage' ? 'Phần trăm' : 'Số tiền'}
                                    </td>
                                    <td>
                                        {item.type === 'percentage' 
                                            ? `${item.value}%` 
                                            : formatCurrency(item.value)}
                                    </td>
                                    <td>{item.current_usage} / {item.max_usage}</td>
                                    <td>{formatCurrency(item.min_order_value)}</td>
                                    <td>{formatDate(item.expiry_date)}</td>
                                    <td className={`status-${item.display_status}`}>
                                        {item.display_status === 'expired' ? 'HẾT HẠN' 
                                            : item.display_status === 'disabled' ? 'VÔ HIỆU'
                                            : item.display_status === 'exhausted' ? 'DÙNG HẾT'
                                            : 'Hoạt động'}
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => removeCoupon(item._id)}
                                            className="action-btn delete-btn"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CouponManager;