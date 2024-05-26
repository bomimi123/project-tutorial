import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext'; // Import useStore hook

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken, logout } = useStore(); // Dùng hook useStore thay vì useContext

  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} className="logo" alt="" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-dowload' onClick={() => setMenu("mobie-app")} className={menu === "mobie-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <Link to='/cart'><img src={assets.search_icon} alt="" /></Link>
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? 
          <button onClick={() => setShowLogin(true)}>sign in</button> :
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" />Orders</li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
