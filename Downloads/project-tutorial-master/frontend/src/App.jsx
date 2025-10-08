import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrder from './pages/MyOrder/MyOrder';
import ContactUs from './pages/Contact/ContactUs';
import AboutUs from './pages/About/AboutUs';
import OrderHistory from './pages/OrderHistory/OrderHistory';
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>


      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorder' element={<MyOrder />} />
          <Route path='/contact-us' element={<ContactUs />}/>
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route />
        </Routes>
      </div>
      <Footer />
      <div className='scroll-to-top-container'>
        <ScrollToTop />
      </div>

      <ToastContainer />
    </>
  );
};

export default App;
