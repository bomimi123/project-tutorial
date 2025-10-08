import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';
import { toast } from 'react-toastify';
import './UserManagement.css';

const UserManagement = () => {
  const { users, token, fetchUsers, deleteUser, fetchUserOrders, updateUser } = useContext(StoreContext);

  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const loadUsers = async () => {
    setIsLoading(true);
    await fetchUsers();
    setIsLoading(false);
  };

  const handleFetchOrders = async (userId) => {
    const ordersData = await fetchUserOrders(userId);
    setSelectedUserOrders(ordersData);
    setShowOrdersModal(true);
  };

  const handleDeleteUser = async () => {
    setShowConfirmModal(false);
    if (await deleteUser(userToDelete)) {
      loadUsers();
    }
    setUserToDelete(null);
  };

      const handleEditClick = (user) => {
        setUserToEdit(user);
        setEditFormData({ 
            name: user.name, 
            email: user.email,
            phone: user.phone || '',
            address: {
                street: user.address?.street || '',
                city: user.address?.city || ''
            }
        });
        setShowEditModal(true);
    };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'street' || name === 'city') {
      setEditFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // handleEditSubmit => Gửi form chỉnh sửa
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const success = await updateUser(userToEdit._id, editFormData);
    if (success) {
      setShowEditModal(false);
      setUserToEdit(null);
    }
  };

  useEffect(() => {
    if (token) {
      loadUsers();
    }
  }, [token]);

  // JSX phải return trong function
  return (
    <div className='user-management'>
      <h2 className='user-management-title'>Quản lý Người dùng</h2>
      <div className='user-list-container'>
        {isLoading ? (
          <p className='loading-message'>Đang tải danh sách người dùng...</p>
        ) : users.length > 0 ? (
          <table className='user-table'>
            <thead>
              <tr className='table-header'>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className='user-row'>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address?.street || 'N/A'}, {user.address?.city || 'N/A'}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>
                    <button onClick={() => handleFetchOrders(user._id)} className='action-btn view-orders-btn'>Xem đơn hàng</button>
                    <button onClick={() => handleEditClick(user)} className='action-btn edit-btn'>Chỉnh sửa</button>
                    <button onClick={() => { setUserToDelete(user._id); setShowConfirmModal(true); }} className='action-btn delete-btn'>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='no-users-message'>Không có người dùng nào.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteUser} className="confirm-btn">Xác nhận</button>
              <button onClick={() => { setShowConfirmModal(false); setUserToDelete(null); }} className="cancel-btn">Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Orders History Modal */}
      {showOrdersModal && (
        <div className="orders-modal-overlay">
          <div className="orders-modal-content">
            <h3 className='orders-modal-title'>Lịch sử Đơn hàng</h3>
              {selectedUserOrders.length > 0 ? (
              selectedUserOrders.map((order, index) => (
                <div key={order._id} className="order-item">
                  <p><strong>Số thứ tự:</strong> {index + 1}</p>
                  <p><strong>Ngày:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Trạng thái:</strong> <span className={`status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}>{order.status}</span></p>
                  <p><strong>Tổng cộng:</strong> ${order.amount}</p>
                  <ul className='order-item-list'>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} x {item.quantity}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>Người dùng này chưa có đơn hàng nào.</p>
            )}
            <button onClick={() => setShowOrdersModal(false)} className="close-modal-btn">Đóng</button>
          </div>
          
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && userToEdit && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>Chỉnh sửa người dùng</h3>
            <form className='edit-user-form' onSubmit={handleEditSubmit}>
              <div className='form-group'>
                <label>Tên</label>
                <input type="text" name="name" value={editFormData.name || ''} onChange={handleEditChange} required />
              </div>

              <div className='form-group'>
                <label>Email</label>
                <input type="email" name="email" value={editFormData.email || ''} onChange={handleEditChange} required />
              </div>

              <div className='form-group'>
                <label>Số điện thoại</label>
                <input type="text" name="phone" value={editFormData.phone || ''} onChange={handleEditChange} required />
              </div>

              <div className='form-group'>
                <label>Địa chỉ</label>
                <input type="text" name="street" value={editFormData.address?.street || ''} onChange={handleEditChange} required />
              </div>

              <div className='modal-actions'>
                <button className='confirm-btn' type='submit'>
                  Cập nhật
                </button>
                <button onClick={() => { setShowEditModal(false); setUserToEdit(null); }} className='cancel-btn' type='button'>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
