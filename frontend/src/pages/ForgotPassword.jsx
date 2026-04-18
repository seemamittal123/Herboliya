import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BarLoader, HashLoader } from "react-spinners";
import { serverUrl } from "../App";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true },
      );
      setLoading(false);
      toast.success(result.data.message);
      setStep(2);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const verifyOtp = async () => {
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true },
      );
      setLoading(false);
      toast.success(result.data.message);
      setStep(3);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const changePassword = async () => {
    setLoading(true);
    if (confirmPassword != newpassword) {
      setLoading(false);
      toast.error("Password is incorrect");
      return null;
    }
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newpassword,
        },
        { withCredentials: true },
      );
      setLoading(false);
      toast.success(result.data.message);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="forgot">
      <div className="forgot-container">

        <div className="forgot-wrapper">
          <div className="sign-up-left">
            <h1>Herboliya</h1>
            <h2>Nature’s Promise for India</h2>
            <p>
              Bringing the richness of traditional Indian spices directly to your
              kitchen. No chemicals. No shortcuts. Just real flavor.
            </p>
            <ul>
              <li>🌱 100% Natural Ingredients</li>
              <li>🧑‍🌾 Sourced from Indian farms</li>
              <li>🚚 Fast & Safe Delivery</li>
            </ul>
          </div>
          <div className="forgot-right-form">
            <div className="form-top-section">
              <h2>Forgot Password</h2>
            </div>
            {step == 1 && (
              <div className="forgot-inner-form">
                <div className="input-wrapper">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email "
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />

                </div>
                <button
                  className={loading ? "forgot-btn loader" : "forgot-btn"}
                  onClick={sendOtp}
                  disabled={loading}
                >

                  {loading ? (
                    <BarLoader color="#fff" loading={loading} />
                  ) : (
                    "Send Otp"
                  )}
                </button>
              </div>
            )}
            {step == 2 && (
              <div className="forgot-inner-form">
                <div className="input-wrapper">
                  <label htmlFor="otp">OTP</label>
                  <input
                    type="number"
                    placeholder="Enter otp"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                  />
                </div>
                <button
                  className={loading ? "forgot-btn loader" : "forgot-btn"}
                  onClick={verifyOtp}
                  disabled={loading}
                >
                  {loading ? (
                    <BarLoader color="#fff" loading={loading} />
                  ) : (
                    "Verify Otp"
                  )}
                </button>
              </div>
            )}
            {step == 3 && (
              <div className="forgot-inner-form">
                <div className="input-wrapper">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type={toggle1 ? "text" : "password"}
                    placeholder="Enter Password "
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newpassword}
                  />
                  <button onClick={() => setToggle1(!toggle1)}>
                    {toggle1 ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="phoneNo">Confirm Password</label>
                  <input
                    type={toggle2 ? "text" : "password"}
                    placeholder="Enter Password "
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <button onClick={() => setToggle2(!toggle2)}>
                    {toggle2 ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button
                  className={loading ? "forgot-btn loader" : "forgot-btn"}
                  onClick={changePassword}
                  disabled={loading}
                >
                  {loading ? (
                    <HashLoader color="#fff" loading={loading} />
                  ) : (
                    "Forgot Password"
                  )}
                </button>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
