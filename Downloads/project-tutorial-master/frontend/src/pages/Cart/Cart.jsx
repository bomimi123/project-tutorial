import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    
    const { 
        cartItems, 
        food_list, 
        removeFromCart, 
        getCartSubtotal, // Dùng để tính tổng tiền hàng
        getFinalTotal,   // Dùng để tính tổng tiền cuối cùng
        url, 
        couponCode,      // State cho input coupon
        setCouponCode,   // Setter cho input coupon
        applyCoupon,     // Hàm áp dụng coupon
        discountInfo,    // Thông tin chiết khấu
        getDiscountAmount, // Số tiền chiết khấu
        DELIVERY_FEE     // Phí giao hàng
    } = useContext(StoreContext);

    const navigate = useNavigate();

    // Định dạng số tiền
    const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
    
    // Kiểm tra nếu giỏ hàng rỗng
    const isCartEmpty = getCartSubtotal() === 0;

    return (
        <div className='cart'>
            <div className="cart-item">
                <div className="cart-item-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {/* HIỂN THỊ CÁC MÓN TRONG GIỎ HÀNG */}
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className='cart-item-title cart-items-item'>
                                    <img src={url + "/images/"+ item.image} alt="" /> 
                                    <p>{item.name}</p>
                                    <p>{formatCurrency(item.price)}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{formatCurrency(item.price * cartItems[item._id])}</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
            </div>

            <div className="cart-bottom">
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        {/* 1. SUBTOTAL */}
                        <div className="cart-total-deitails">
                            <p>Subtotal (Tổng tiền hàng)</p>
                            <p>{formatCurrency(getCartSubtotal())}</p>
                        </div>
                        
                        {/* 2. CHIẾT KHẤU / GIẢM GIÁ */}
                        {getDiscountAmount() > 0 && (
                            <>
                                <hr />
                                <div className="cart-total-deitails discount-row">
                                    <p className='text-red-500 font-semibold'>
                                        Discount ({discountInfo.value}{discountInfo.type === 'percent' ? '%' : ' Fixed'})
                                    </p>
                                    <p className='text-red-500 font-semibold'>
                                        -{formatCurrency(getDiscountAmount())}
                                    </p>
                                </div>
                            </>
                        )}

                        {/* 3. PHÍ GIAO HÀNG */}
                        <hr />
                        <div className="cart-total-deitails">
                            <p>Delivery Free</p>
                            {/* Phí ship chỉ tính khi tổng tiền hàng > 0 (Dựa trên logic trong StoreContext) */}
                            <p>{formatCurrency(getCartSubtotal() > 0 ? DELIVERY_FEE : 0)}</p>
                        </div>
                        
                        {/* 4. TỔNG TIỀN CUỐI CÙNG */}
                        <hr />
                        <div className="cart-total-deitails font-bold text-lg">
                            <p>Total</p>
                            <p>{formatCurrency(getFinalTotal())}</p>
                        </div>
                    </div>
                    {/* Nút PROCEED TO CHECKOUT bị disable nếu giỏ hàng trống */}
                    <button 
                        onClick={()=>navigate('/order')} 
                        disabled={isCartEmpty}
                        className={isCartEmpty ? 'disabled-button' : ''}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>

                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input 
                                type="text" 
                                placeholder={getDiscountAmount() > 0 ? `Code applied: ${couponCode}` : 'Enter promo code'}
                                value={couponCode} // Bind với state couponCode từ context
                                onChange={(e) => setCouponCode(e.target.value)}
                                // Vô hiệu hóa input nếu mã đã được áp dụng
                                disabled={getDiscountAmount() > 0} 
                            />
                            {/* Nút Submit gọi hàm applyCoupon */}
                            <button 
                                onClick={applyCoupon} // Gọi hàm applyCoupon từ context
                                disabled={getDiscountAmount() > 0 || isCartEmpty || !couponCode} 
                                className={getDiscountAmount() > 0 ? 'applied-btn' : ''}
                            >
                                {getDiscountAmount() > 0 ? 'Applied' : 'Submit'}
                            </button>
                        </div>
                        {getDiscountAmount() > 0 && (
                            <p className='coupon-success-msg'>Mã giảm giá đã được áp dụng thành công!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
