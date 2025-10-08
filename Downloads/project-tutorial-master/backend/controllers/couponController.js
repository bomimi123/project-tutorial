import couponModel from "../models/couponModel.js";

// Tạo coupon mới (Chỉ Admin)
const createCoupon = async (req, res) => {
    const {
        code, type, value, max_usage, min_order_value, expiry_date
    } = req.body;

    if (!code || !type || !value || !max_usage || !min_order_value || !expiry_date) {
        return res.json({
            success: false, message: "Vui lòng điền đầy đủ các trường bắt buộc."
        });
    }
    try {
        // kiểm tra mã code đã tồn tại
        const existingCoupon = await couponModel.findOne({
            code: code.toUpperCase()
        });
        if (existingCoupon) {
            return res.json({
                success: false, message: "Mã giảm giá này đã tồn tại."
            });
        }

        if (new Date(expiry_date) <= new Date()) {
            return res.json({
                success: false, message: "Ngày hết hạn phải lớn hơn ngày hiện tại."
            });
        }

        // tạo coupon mới
        const newCoupon = new couponModel({
            code: code.toUpperCase(),
            type,
            value,
            max_usage,
            min_order_value: min_order_value || 0,
            start_date: new Date(),
            expiry_date: new Date(expiry_date),
            current_usage: 0,
            status: 'active'
        });

        await newCoupon.save();
        res.json({ success: true, message: "Tạo mã giảm giá thành công." });
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Tạo mã giảm giá không thành công." });
    }
};

// 🛑 CẬP NHẬT 1: Đổi tên hàm thành listAdminCoupons (Dành cho Admin)
const listAdminCoupons = async (req, res) => {
    try {
        const coupons = await couponModel.find({});
        const now = new Date();

        const updatedCoupons = coupons.map(coupon => {
            let display_status = coupon.status;

            if (display_status === 'active') {
                if (coupon.expiry_date < now) {
                    display_status = 'expired';
                } else if (coupon.current_usage >= coupon.max_usage) {
                    display_status = 'exhausted';
                }
            }
            return {
                ...coupon._doc,
                display_status
            };
        });
        res.json({ success: true, data: updatedCoupons });
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Lấy danh sách mã giảm giá không thành công." });
    }
};

// 🛑 CẬP NHẬT 2: HÀM MỚI: listPublicCoupons (Dành cho Frontend Client)
const listPublicCoupons = async (req, res) => {
    try {
        // Lọc chỉ lấy các coupon đang 'active' và chưa hết hạn/hết lượt sử dụng
        const now = new Date();
        const coupons = await couponModel.find({
            status: 'active',
            expiry_date: { $gt: now }, // Lớn hơn ngày hiện tại
            // Có thể thêm điều kiện current_usage < max_usage nếu cần lọc ngay ở đây
        });

        // Chỉ trả về các trường cần thiết cho Client để tiết kiệm băng thông và bảo mật
        const publicData = coupons.map(coupon => ({
            code: coupon.code,
            type: coupon.type,
            value: coupon.value,
            min_order_value: coupon.min_order_value,
            expiry_date: coupon.expiry_date
        }));

        res.json({ success: true, data: publicData });
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Lỗi server khi lấy danh sách mã giảm giá công khai." });
    }
};


// Xóa mã giảm giá (Chỉ Admin)
const removeCoupon = async (req, res) => {
    try {
        const { id } = req.body;

        const coupon = await couponModel.findByIdAndDelete(id);

        if (coupon) {
            res.json({ success: true, message: "Xóa mã giảm giá thành công." });
        } else {
            res.json({ success: false, message: "Xóa mã giảm giá không thành công." });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Không tìm thấy mã giảm giá." });
    }
};

// Xác thực và áp dụng mã giảm giá (Dành cho User - có thể dùng authMiddleware)
const applyCoupon = async (req, res) => {
    const { code, current_amount } = req.body;

    if (!code || typeof current_amount !== 'number') {
        return res.json({ success: false, message: "Thiếu mã giảm giá hoặc tổng giá trị đơn hàng không hợp lệ." });
    }

    try {
        const coupon = await couponModel.findOne({ code: code.toUpperCase() });

        if (!coupon) {
            return res.json({ success: false, message: "Mã giảm giá không hợp lệ hoặc không tồn tại." });
        }

        const now = new Date();
        let discountAmount = 0;

        // kiểm tra trạng thái
        if (coupon.status === 'disabled' || coupon.expiry_date < now || coupon.current_usage >= coupon.max_usage) {
            return res.json({ success: false, message: "Mã giảm giá này đã bị vô hiệu hóa." });
        }

        // kiểm tra ngày hết hạn
        if (coupon.expiry_date < now) {
            return res.json({ success: false, message: "Mã giảm giá này đã hết hạn sử dụng." });
        }

        // kiểm tra giới hạn sử dụng
        if (coupon.current_usage >= coupon.max_usage) {
            return res.json({ success: false, message: "Mã giảm giá này đã hết lượt sử dụng." });
        }

        // kiểm tra giá trị đơn hàng tối thiểu
        if (current_amount < coupon.min_order_value) {
            return res.json({
                success: false,
                message: `Đơn hàng tối thiểu phải là ${coupon.min_order_value.toLocaleString('vi-VN')} VND`
            });
        }

        // tính toán số tiền giảm
        if (coupon.type === 'percentage') {
            const percentageValue = coupon.value / 100;
            discountAmount = current_amount * percentageValue;
        } else if (coupon.type === 'fixed_amount') {
            discountAmount = coupon.value;
        }

        // không cho số tiền giảm vượt quá tổng đơn hàng
        if (discountAmount > current_amount) {
            discountAmount = current_amount;
        }

        res.json({
            success: true,
            message: "Áp dụng mã giảm giá thành công.",
            discount: Math.floor(discountAmount),
            couponId: coupon._id
        });

    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Lỗi server khi áp dụng mã giảm giá. Vui lòng liên hệ với tổng đài để được hỗ trợ." });
    }
};

export {
    createCoupon, listAdminCoupons, listPublicCoupons, removeCoupon, applyCoupon
};