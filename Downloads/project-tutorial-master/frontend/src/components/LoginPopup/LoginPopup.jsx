import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: {
      street: ""
    },
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "street" || name === "city") {
      setData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    let succesMessage = "";

    if (currState === "Login") {
      newUrl += "/api/user/login";
      succesMessage = "Chúc mừng đăng nhập thành công";
    } else {
      newUrl += "/api/user/register";
      succesMessage = "Chúc mừng đăng ký thành công";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        // thong bao thanh cong
        toast.success(succesMessage, {
          autoClose: 2000,
          onClose: () => {
            toast.success(`Xin chào ${data.name}!`, {
              autoClose: 2000,
              onClose: () => {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
              }
            });
          }
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Lỗi: ", error);
      alert("Đã xảy ra lỗi , vui lòng thử lại");
    }
  };

  return (
    <div className="login-popup">
      {" "}
      <form onSubmit={onLogin} className="login-popup-container">
        {" "}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          {" "}
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
          {" "}
        </div>
        {" "}
        <div className="login-popup-inputs">
          {/* Các input chỉ hiển thị khi đăng ký */}         {" "}
          {currState === "Sign Up" && (
            <>
              {" "}
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
              />
              {" "}
              <input
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="tel"
                placeholder="Phone number"
                required
              />
              {" "}
              <input
                name="street"
                onChange={onChangeHandler}
                value={data.address.street}
                type="text"
                placeholder="Street"
                required
              />

            </>
          )}
          {/* Các input chung cho cả Đăng nhập và Đăng ký */}
          {" "}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            autoComplete="username"
            required
          />
          {" "}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          {" "}
        </div>
        {" "}
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {" "}
        <div className="login-popup-condition">
          <input type="checkbox" required />         {" "}
          <p>By continuing, you agree to the terms of use & privacy policy.</p>
          {" "}
        </div>
        {" "}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
        {" "}
      </form>
      {" "}
    </div>
  );
};

export default LoginPopup;
