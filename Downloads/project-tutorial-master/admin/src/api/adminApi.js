import axios from 'axios';
// KHÔNG IMPORT REACT HAY CONTEXT VÌ ĐÂY KHÔNG PHẢI LÀ COMPONENT
// import React, { useState, useEffect, useContext } from 'react';
// import { StoreContext } from '../context/StoreContext'; 

// 🛑 KHẮC PHỤC LỖI: Định nghĩa URL Backend một cách tĩnh (cố định)
// Sử dụng URL Backend mà bạn đã dùng trong các file khác
const BACKEND_URL = "http://localhost:4000"; 

const adminAxios = axios.create ({
    // 🛑 KHẮC PHỤC LỖI: Sử dụng URL tĩnh
    baseURL: BACKEND_URL, 
    timeout: 10000
});

adminAxios.interceptors.request.use(
    (config) => {
        // Lấy Token từ Local Storage
        const adminToken = localStorage.getItem('token');
        
        if ( adminToken) {
            config.headers.token = adminToken;
        } else {
            console.warn("Axios send request without admin_token");
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default adminAxios;

// Lưu ý: Các file component (như CouponManager.jsx) sẽ không cần URL nữa.
// Nếu bạn cần URL trong bất kỳ component nào, bạn có thể lấy nó từ StoreContext 
// HOẶC dùng biến BACKEND_URL đã định nghĩa ở trên (nếu bạn export nó).