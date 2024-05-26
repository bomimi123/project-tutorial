import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';


const LoginPopup = ({ setShowLogin }) => {
    // const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");
   

    return (
        <div className='login-popup'>
            <form  className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null :
                        <input name='name'  type="text" placeholder='Your name' required />
                    }
                    <input name='email'  type="email" placeholder='Your email' autoComplete="username" required />
                    <input name='password' type="password" placeholder='Password' autoComplete="current-password" required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, you agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ?
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;
