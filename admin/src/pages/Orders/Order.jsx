import React, { useState, useEffect } from 'react';
import './Order.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
      const response = await axios.post(url+"/api/order/status", {
        orderId,
        status:event.target.value
      });
      if ( response.data.success) {
        await fetchAllOrders(); 
      }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}{idx === order.items.length - 1 ? '' : ', '}
                  </span>
                ))}
              </p>
              <p className='order-item-name'>
                {order.address ? `${order.address.firstName} ${order.address.lastName}` : 'No User Info'}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivery">Delivery</option>
            </select>

          </div>
        ))}
      </div>  
    </div>
  );
};

export default Order;
