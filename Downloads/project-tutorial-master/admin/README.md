# 🛠️ Admin Dashboard

## 📌 Giới thiệu
Thư mục `admin/` chứa phần **Admin Dashboard** của hệ thống. Đây là giao diện quản trị dành cho **Admin** để:

- Quản lý người dùng 👥  
- Quản lý sản phẩm/dịch vụ 📦  
- Quản lý đơn hàng 📑  
- Thống kê và báo cáo 📊  
- Cấu hình hệ thống ⚙️  

Ứng dụng được phát triển bằng:

- **React.js** (UI library)  
- **React Router** (điều hướng)  
- **React Context API** (quản lý state toàn cục)  
- **React-Toastify** (UI thông báo)  
- **CSS Modules** (tùy chỉnh giao diện)  

## ⚙️ Cài đặt

### 1️⃣ Clone dự án
```bash
git clone https://github.com/<your-repo>/project.git
cd project/admin
2️⃣ Cài dependencies
bash
Copy code
npm install
3️⃣ Tạo file .env
Trong thư mục admin/, tạo file .env và thêm:

env
Copy code
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AUTH_TOKEN=your-secret-token
4️⃣ Chạy ứng dụng
bash
Copy code
npm start
Ứng dụng sẽ chạy tại 👉 http://localhost:5173

🚀 Scripts có sẵn
Lệnh	Chức năng
npm start	Chạy ứng dụng development
npm run build	Build production
npm test	Chạy unit test
npm run lint	Kiểm tra code với ESLint

🧩 Các module chính
👥 User Management
Hiển thị danh sách người dùng (trừ mật khẩu)

Xem lịch sử đơn hàng của từng user

Chỉnh sửa và xóa thông tin người dùng

📦 Product Management
Tạo sản phẩm mới (ảnh, tên, nội dung, giá tiền, kiểu sản phẩm)

Hiển thị danh sách sản phẩm với đầy đủ thông tin

Chỉnh sửa, xóa sản phẩm

📑 Orders
Quản lý toàn bộ thông tin đơn hàng (người đặt, sản phẩm, giá trị, ngày đặt, ...)

Cập nhật trạng thái đơn hàng với 4 option trạng thái (ví dụ: Pending, Processing, Shipped, Completed)

📊 Admin Dashboard
Tổng quan số liệu:

Tổng doanh thu (tuần) 💰

Tổng số đơn hàng 📦

ID phiên làm việc (Admin) 🔑

Thống kê chuyên sâu:

Sản phẩm bán chạy nhất 🏆

Khách hàng order nhiều nhất 👑

Tình hình đơn hàng (tổng số đơn, phân loại theo trạng thái)

⚙️ Settings
Quản lý quyền truy cập (Role-based: Admin, Staff, User)

Cấu hình hệ thống

🔒 Bảo mật
Xác thực với JWT Token cho tất cả API request

Role-based access control (Admin, Staff, User)

Tích hợp qua StoreContext để kiểm tra quyền truy cập trước khi vào page

📜 License
Dự án phát triển phục vụ mục đích học tập và thử nghiệm.
Không khuyến khích dùng trực tiếp cho môi trường production nếu chưa tối ưu về bảo mật và hiệu năng.