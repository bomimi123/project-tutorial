import mongoose from 'mongoose';

// Định nghĩa Schema cho Mã giảm giá
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // Mã code phải là duy nhất
        uppercase: true, // Lưu trữ ở dạng chữ hoa
        trim: true
    },
    type: {
        type: String, // 'percentage' hoặc 'fixed_amount'
        required: true,
        enum: ['percentage', 'fixed_amount']
    },
    value: {
        type: Number, // Giá trị giảm (VD: 10% hoặc 50000 VND)
        required: true,
        min: 1
    },
    max_usage: {
        type: Number, // Số lần sử dụng tối đa
        required: true,
        default: 100,
        min: 1
    },
    current_usage: {
        type: Number, // Số lần đã sử dụng
        default: 0
    },
    min_order_value: {
        type: Number, // Giá trị đơn hàng tối thiểu để áp dụng
        default: 0,
        min: 0
    },
    expiry_date: {
        type: Date, // Ngày hết hạn
        required: true
    },
    is_active: {
        type: Boolean, // Kích hoạt/Vô hiệu hóa thủ công
        default: true
    }
}, { timestamps: true }); // Thêm createdAt, updatedAt

const couponModel = mongoose.models.coupon || mongoose.model('coupon', couponSchema);
export default couponModel;
