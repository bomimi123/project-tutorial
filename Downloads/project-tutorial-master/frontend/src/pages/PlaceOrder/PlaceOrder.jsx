import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
    const { getCartSubtotal, getFinalTotal, DELIVERY_FEE, token, food_list, cartItems, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "", 
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    // State mới để quản lý pop-up
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        // Đã SỬA LỖI: Dùng getFinalTotal() để lấy tổng tiền cuối cùng (bao gồm phí ship và giảm giá)
        let orderData = {
            address: data,
            items: orderItems,
            amount: getFinalTotal(), 
            // Lưu ý: getFinalTotal() đã bao gồm phí ship, nên không cần + 2 nữa.
        };

        try {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            
            // Đã SỬA LỖI: Đảo ngược lại logic if/else bị sai trước đó
            if (response.data.success) {
                const orderId = response.data.orderId;
                
                setPopupMessage("Đơn hàng đã được đặt thành công!.");
                setIsSuccess(true);
                setShowPopup(true);
                
                // Nếu có session_url từ Backend (cho cổng thanh toán), chuyển hướng ngay
                if (response.data.session_url) {
                    window.location.replace(response.data.session_url);
                } else {
                    // Nếu không có cổng thanh toán, chuyển hướng sau 3 giây
                    setTimeout(() => {
                        navigate(`/verify?success=true&orderId=${orderId}`);
                    }, 3000);
                }
            } else {
                setPopupMessage(response.data.message || "Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
                setIsSuccess(false);
                setShowPopup(true);
            }
        } catch (error) {
            console.error("Error placing order", error);
            setPopupMessage("Đã xảy ra lỗi kết nối. Vui lòng thử lại.");
            setIsSuccess(false);
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    }

    // Lấy giá trị subtotal và final total trước khi render
    const subtotal = getCartSubtotal();
    const finalTotal = getFinalTotal();
    const isCartEmpty = subtotal === 0;

    useEffect(() => {
        // Đã SỬA LỖI: Dùng getCartSubtotal() để kiểm tra giỏ hàng
        if (!token) {
            navigate("/cart");
        } else if (subtotal === 0) {
            navigate('/cart');
        }
    }, [token, subtotal, navigate]); // Thêm subtotal và navigate vào dependency array


    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="card-total-details">
                            <p>Subtotal</p>
                            {/* Đã SỬA LỖI: Dùng subtotal */}
                            <p>${subtotal.toFixed(2)}</p> 
                        </div>
                        <hr />
                        <div className="card-total-details">
                            <p>Delivery Fee</p>
                            {/* Đã SỬA LỖI: Dùng isCartEmpty và DELIVERY_FEE */}
                            <p>${isCartEmpty ? 0 : DELIVERY_FEE.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="card-total-details">
                            <b>Total</b>
                            {/* Đã SỬA LỖI: Dùng finalTotal */}
                            <b>${finalTotal.toFixed(2)}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO CHECKOUT</button>
                </div>
            </div>

            {/* Custom Popup for success/failure */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <div className={`popup-header ${isSuccess ? 'success' : 'failure'}`}>
                            {isSuccess ? 'Thành công!' : 'Thất bại!'}
                        </div>
                        <div className="popup-body">
                            <p>{popupMessage}</p>
                            <button onClick={closePopup} className="close-btn">Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
};

export default PlaceOrder;
