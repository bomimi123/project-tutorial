import React, { useContext, useState, useEffect, useRef } from 'react';
// Giả định CSS, Assets và Context được import từ các đường dẫn tương đối
import './Navbar.css'; 
import { assets } from '../../assets/assets.js'; 
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { 
        url, 
        // Dùng getCartSubtotal để kiểm tra giỏ hàng rỗng
        getCartSubtotal, 
        token, 
        setToken,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        isLoading
    } = useContext(StoreContext);

    const navigate = useNavigate();
    const [showSearchInput, setShowSearchInput] = useState(false);
    const searchBarRef = useRef(null);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Đóng thanh tìm kiếm khi click ra ngoài khu vực tìm kiếm
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setShowSearchInput(false);
                setSearchQuery('');
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setSearchQuery, setSearchResults]);

    const handleSearchIconClick = () => {
        // Toggle trạng thái hiển thị của input tìm kiếm
        setShowSearchInput(prev => !prev);
        if (showSearchInput) {
            // Reset nếu đang hiển thị và người dùng click vào icon
            setSearchQuery('');
            setSearchResults([]);
        }
    };

    const handleItemClick = () => {
        // Đóng thanh tìm kiếm khi người dùng chọn một món ăn
        setShowSearchInput(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>
            
            {/* Thanh Menu Chính */}
            <ul className='navbar-menu'>
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <Link to="/cart" onClick={() => setMenu("cart")} className={menu === "cart" ? "active" : ""}>Cart</Link>
                <Link to="/order-history" onClick={() => setMenu("order-history")} className={menu === "order-history" ? "active" : ""}>Order History</Link>
                <Link to='/contact-us' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</Link>
                <Link to='/about-us' onClick={() => setMenu("about-us")} className={menu === "about-us" ? "active" : ""}>About Us</Link>
            </ul>

            <div className="navbar-right">
                {/* Thanh Tìm kiếm và Dropdown */}
                <div className="navbar-search-bar" ref={searchBarRef}>
                    <div className='navbar-search-container'>
                        <img 
                            src={assets.search_icon} 
                            alt="Search Icon" 
                            onClick={handleSearchIconClick}
                        />
                        <div className={`navbar-search-input ${showSearchInput ? 'active' : ''}`}>
                            <input 
                                type="text" 
                                placeholder='Tìm kiếm món ăn...' 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {showSearchInput && (searchQuery.length > 0) && (
                        <div className="navbar-search-dropdown">
                            {isLoading && <p className="loading-spinner">Đang tải...</p>}
                            
                            {!isLoading && searchResults.length > 0 ? (
                                searchResults.map((item) => (
                                    <Link 
                                        to={`/food/${item._id}`} 
                                        key={item._id} 
                                        className="dropdown-item"
                                        onClick={handleItemClick}
                                    >
                                        <img src={url+"/images/"+item.image} alt={item.name} />
                                        <div className="item-info">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-price">${item.price}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : !isLoading && searchQuery.length > 0 && (
                                <p className="no-results">Không tìm thấy món ăn nào khớp với "{searchQuery}"</p>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Icon Giỏ hàng và Chấm đỏ thông báo */}
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon" /></Link>
                    {/* Dùng getCartSubtotal() để kiểm tra giỏ hàng rỗng (Subtotal > 0 có nghĩa là có hàng) */}
                    <div className={getCartSubtotal() === 0 ? "" : "dot"}></div> 
                </div>

                {/* Đăng nhập/Profile */}
                {!token ? <button onClick={() => setShowLogin(true)} type='submit'>Sign in</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate('/myorder')}><img src={assets.bag_icon} alt="" /><p>My Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;
