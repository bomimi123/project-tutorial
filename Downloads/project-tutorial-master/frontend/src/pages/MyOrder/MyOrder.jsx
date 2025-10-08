import React, { useContext, useEffect, useState } from 'react';
import './MyOrder.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const MyOrder = () => {
    
    const { 
        url,
        token,
        orderHistory,
        newlyCompletedOrders
    } = useContext(StoreContext);
    const [data, setData] = useState([]); 

    const fetchOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/userorders", { headers: { token } });
            
            setData(response.data.data); 
            console.log(response.data);
        } catch (error) {
            console.log("Error fetching orders:", error);
        }
    };

      useEffect(() => {
        if (newlyCompletedOrders.length > 0) {
            newlyCompletedOrders.forEach(order => {
                const orderIdShort = order._id.substring(0, 6);
                toast.success(`Đơn hàng #${orderIdShort} của bạn đã HOÀN TẤT!`);
            });
           
        }
    }, [newlyCompletedOrders]);

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='myorder'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <p>
                            {order.items.map((item, idx) => (
                                <span key={idx}>
                                    {item.name} x {item.quantity}{idx === order.items.length - 1 ? '' : ', '}
                                </span>
                            ))}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrder;