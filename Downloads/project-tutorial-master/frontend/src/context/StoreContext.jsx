import axios from 'axios';
import React, { createContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

// Key dùng để lưu đơn hàng đã thông báo
const NOTIFICATION_KEY = 'order_completed_notifications';
// Phí giao hàng cố định (USD)
const DELIVERY_FEE = 2; 

const StoreContextProvider = (props) => {
    const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
    const [cartItems, setCartItems] = useState({}); // {itemId: quantity}
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // ---------------- COUPON STATES ----------------
    // couponCode: State cho input nhập mã giảm giá (chưa áp dụng)
    const [couponCode, setCouponCode] = useState(''); 
    // appliedPromoCode: Mã đã áp dụng thành công
    const [appliedPromoCode, setAppliedPromoCode] = useState(''); 
    // discountInfo: { type: "percent" | "fixed" | null, value: number, code: string }
    // Lưu ý: value là giá trị giảm (theo USD) hoặc giá trị cố định (theo % hoặc VND gốc, tùy Backend trả về)
    const [discountInfo, setDiscountInfo] = useState({ type: null, value: 0 }); 

    // Search (Navbar)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchTimeoutRef = useRef(null);

    // Order history
    const [orderHistory, setOrderHistory] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);
    const [orderError, setOrderError] = useState('');
    const [orderSearchQuery, setOrderSearchQuery] = useState('');
    const [orderFilterStatus, setOrderFilterStatus] = useState('all');

    // Lưu đơn hàng vừa Completed mà chưa thông báo
    const [newlyCompletedOrders, setNewlyCompletedOrders] = useState([]);

    // ---------------- CART & TOTALS ----------------
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
        // Khi thêm/bớt hàng, reset coupon
        if(discountInfo.type !== null) {
            setDiscountInfo({ type: null, value: 0 }); 
            setAppliedPromoCode('');
            setCouponCode('');
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCount = (prev[itemId] || 0) - 1;
            const newCartItems = { ...prev, [itemId]: newCount > 0 ? newCount : 0 };
            if (newCount <= 0) delete newCartItems[itemId];
            return newCartItems;
        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
        // Khi thêm/bớt hàng, reset coupon
        if(discountInfo.type !== null) {
            setDiscountInfo({ type: null, value: 0 });
            setAppliedPromoCode('');
            setCouponCode('');
        }
    };

    // ✅ Hàm tính Subtotal (Tổng tiền hàng) - Trả về NUMBER (USD)
    const getCartSubtotal = () => {
        let subtotal = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    subtotal += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return subtotal;
    };
    
    // Hàm tính toán số tiền giảm giá (USD)
    const getDiscountAmount = () => {
        // Backend hiện tại trả về 'discount' là số tiền USD được giảm.
        // Frontend chỉ cần dùng giá trị này.
        // Giá trị discountInfo.value bây giờ là số tiền USD được giảm.
        return discountInfo.value; 
    };

    // ✅ Hàm tính toán Tổng tiền cuối cùng - Trả về NUMBER (USD)
    const getFinalTotal = () => {
        const subtotal = getCartSubtotal();
        const discount = getDiscountAmount();
        // Chỉ tính phí ship khi có hàng và tổng tiền hàng sau giảm giá còn > 0
        const deliveryFee = subtotal > 0 && (subtotal - discount) > 0 ? DELIVERY_FEE : 0; 
        
        // Áp dụng giảm giá và cộng phí ship, đảm bảo tổng tiền không âm
        return Math.max(0, subtotal - discount + deliveryFee);
    };

    // ---------------- COUPON LOGIC ----------------
    const applyCoupon = async () => {
        const code = couponCode.trim();
        const subtotal = getCartSubtotal();
        // Lấy tổng tiền, đảm bảo nó là kiểu số (Number)
        const current_amount = Number(subtotal); 

        if (current_amount === 0) {
            toast.error("Giỏ hàng trống! Vui lòng thêm sản phẩm.");
            return;
        }
        if (!code) {
            toast.error("Vui lòng nhập mã giảm giá.");
            return;
        }

        // Reset trạng thái giảm giá trước khi gọi API
        setDiscountInfo({ type: null, value: 0 }); 
        setAppliedPromoCode('');

        try {
            // ✅ Đã SỬA LỖI: Thêm current_amount vào payload
            const response = await axios.post(url + "/api/coupon/validate", 
                { code, current_amount }, // <--- Đã thêm current_amount
                { headers: { token } }
            );

            if (response.data.success) {
                // Backend trả về 'discount' (số tiền USD được giảm) và 'discountType' (fixed/percentage)
                const { discount, discountType } = response.data;
                
                // Lưu thông tin giảm giá đã áp dụng. type có thể là 'fixed' hoặc 'percentage'
                setDiscountInfo({ type: discountType, value: discount });
                setAppliedPromoCode(code);
                toast.success(`Mã ${code} đã được áp dụng thành công!`);
            } else {
                toast.error(response.data.message || "Mã không hợp lệ hoặc đã hết hạn.");
            }
        } catch (error) {
            console.error("Lỗi khi áp dụng promo code:", error);
            toast.error("Lỗi kết nối khi kiểm tra mã giảm giá.");
        }
    };


    // ---------------- FETCH DATA ----------------
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart data", error);
        }
    };

    // ---------------- SEARCH ----------------
    const fetchSearchResults = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`${url}/api/food/search?q=${query}`);
            if (response.data.success) {
                setSearchResults(response.data.data);
            } else {
                setSearchResults([]);
                console.error("Search API failed:", response.data.message);
            }
        } catch (error) {
            setSearchResults([]);
            console.error("Error fetching search results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- ORDERS ----------------
    const fetchOrders = async () => {
        setOrderLoading(true);
        try {
            const response = await axios.get(`${url}/api/order/userorders`, {
                headers: { token },
                params: { status: orderFilterStatus, search: orderSearchQuery }
            });

            if (response.data.success) {
                const orders = response.data.data;

                // Lấy danh sách đơn hàng đã được thông báo trước đó
                const notifiedOrders = JSON.parse(localStorage.getItem(NOTIFICATION_KEY) || '{}');
                const newCompleted = [];
                const updatedNotified = { ...notifiedOrders };

                orders.forEach(order => {
                    const orderId = order._id;
                    const isCompleted = order.status.toLowerCase() === "order completed".toLowerCase();

                    if (isCompleted && !notifiedOrders[orderId]) {
                        newCompleted.push(order);
                        updatedNotified[orderId] = true;
                    }
                });

                setOrderHistory(orders);
                setNewlyCompletedOrders(newCompleted);
                localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(updatedNotified));
                setOrderError('');
            } else {
                toast.error(response.data.message);
                setOrderError(response.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Không thể lấy dữ liệu đơn hàng.");
            setOrderError("Không thể lấy dữ liệu đơn hàng.");
        } finally {
            setOrderLoading(false);
        }
    };

    // ---------------- EFFECTS ----------------
    // Search effect
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchQuery === '') {
            setSearchResults([]);
            setIsLoading(false);
            return;
        }

        searchTimeoutRef.current = setTimeout(() => {
            fetchSearchResults(searchQuery);
        }, 300);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    // Initial load
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, []);

    // Fetch orders on changes
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, orderFilterStatus, orderSearchQuery]);

    // Scroll button visibility
    useEffect(() => {
        const toggleScrollButtonVisibility = () => {
            setIsScrollButtonVisible(window.pageYOffset > 1500);
        };

        window.addEventListener("scroll", toggleScrollButtonVisibility);
        return () => {
            window.removeEventListener("scroll", toggleScrollButtonVisibility);
        };
    }, []);

    // ---------------- CONTEXT VALUE ----------------
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        isScrollButtonVisible,
        url,
        token,
        setToken,
        // Coupon Logic (Đã cập nhật)
        getCartSubtotal, // Hàm mới tính subtotal
        couponCode,       // State cho input
        setCouponCode,    // Setter cho input
        appliedPromoCode, // Mã đã được áp dụng
        discountInfo,     // Thông tin giảm giá
        applyCoupon,      // Hàm áp dụng mã
        getDiscountAmount,
        getFinalTotal,    // Hàm mới tính tổng cuối cùng
        DELIVERY_FEE,
        // search drop-down
        searchQuery,
        setSearchQuery,
        searchResults,
        isLoading,
        setSearchResults,
        // order history 
        orderHistory,
        orderLoading,
        orderError,
        orderSearchQuery,
        setOrderSearchQuery,
        orderFilterStatus,
        setOrderFilterStatus,
        newlyCompletedOrders,
        setNewlyCompletedOrders
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
