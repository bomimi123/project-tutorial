import jwt from "jsonwebtoken";

const adminMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Please login again." });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
        
        // KIỂM TRA QUYỀN ADMIN: Dùng === true
        if (decodedToken.isAdmin === true) { 
            next(); 
        } else {
            return res.json({ success: false, message: "Truy cập bị từ chối: Không có quyền Admin." });
        }
        
    } catch (error) {
        return res.json({ success: false, message: "Lỗi xác thực Admin: Token không hợp lệ." });
    }
};

export default adminMiddleware;