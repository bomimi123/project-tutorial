import React, { useState } from 'react';
import './ContactUs.css';
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    // Corrected: Move status state to the top level of the component
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Đang gửi...');

        try {
            
            let response = await axios.post('http://localhost:4000/api/contact/send-email', formData);

            if (response.data.success) {
                setFormData({ name: '', email: '', message: '' });
                setStatus('✅ Tin nhắn của bạn đã được gửi thành công!');
            } else {
                setStatus('❌ Gửi tin nhắn thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi form:', error);
            setStatus('❌ Gửi tin nhắn thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className='contact-us'>
            <h2>Liên hệ với chúng tôi</h2>
            <p className='contact-intro'>Hãy gửi cho chúng tôi thắc mắc hoặc phản hồi của bạn!</p>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Họ và Tên</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="message">Nội dung</label>
                    <textarea id="message" rows="5" name="message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type='submit'>Gửi</button>
            </form>
            {status && <p className='form-status'>{status}</p>}
        </div>
    );
};

export default ContactUs;