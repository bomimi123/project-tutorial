import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import orderModel from "../models/orderModel.js";


// tạo token
const createToken = (id, isAdmin) => {
    // Đảm bảo giá trị isAdmin được truyền vào là Boolean
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET)
}


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // CẬP NHẬT: Sử dụng user.isAdmin (hoặc user.role nếu bạn dùng nó)
        const isAdminBoolean = user.isAdmin === true;

        const token = createToken(user._id, isAdminBoolean);
        res.json({ success: true, token, name: user.name, message: "Đăng nhập thành công!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// register user
const registerUser = async (req, res) => {
    const { name, password, email, phone, address } = req.body;
    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Plese enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Pleses enter a strong password" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            address: address,
            // Giả sử schema có trường 'role' (admin/user) hoặc 'isAdmin' (boolean)
            // Nếu bạn dùng 'role', cần set nó ở đây.
            role: 'user'
        });
        const user = await newUser.save()

        // Đảm bảo gọi createToken với user.role/user.isAdmin
        // Giả sử bạn sử dụng 'role' và giá trị mặc định là 'user'
        const isAdminBoolean = user.role === 'admin' ? true : false;
        const token = createToken(user._id, isAdminBoolean)

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "User Already Exists ... ERROR" });
    }
}


// lay danh sach users (Giữ nguyên)
const listUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error fetching user list" });
    }
};


// xoa user (Giữ nguyên)
const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Xóa người dùng thành công!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error fetching user list" });
    }
};


// lay lich su don hang cua user (Giữ nguyên)
const listUserOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.params.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Không thể lấy lịch sử đơn hàng" });
    }
};


const updateUser = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const userId = req.params.userId;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email, phone, address },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({ success: false, message: "không tìm thấy người dùng" });
        }

        res.json({ success: true, message: " Cập nhật người dùng thành công ", data: updatedUser });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi trong quá trình cập nhật người dùng" });
    }
}

// ĐĂNG NHẬP ADMIN
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Vui lòng nhập đầy đủ email và mật khẩu." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Thông tin đăng nhập không hợp lệ." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Thông tin đăng nhập không hợp lệ." });
        }

        // KIỂM TRA QUYỀN ADMIN
        if (!user.isAdmin) {
            return res.json({ success: false, message: "Truy cập bị từ chối: Tài khoản không có quyền Admin." });
        }

        // 🛑 ĐÃ SỬA LỖI: Gọi createToken với 2 tham số (ID và isAdmin=true)
        const token = createToken(user._id, true);

        // Trả về Token Admin
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi Server khi đăng nhập Admin." });
    }
}


export { loginUser, registerUser, listUsers, deleteUser, listUserOrders, updateUser, loginAdmin }