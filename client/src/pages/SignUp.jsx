import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { BarLoader, HashLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { serverUrl } from "../App";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState({});
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [otp, setotp] = useState('');
  const [step, setstep] = useState(1)
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleName = (value) => {
    setName(value);
    setError({ ...error, nameError: "" });
  };
  const handleEmail = (value) => {
    setEmail(value);
    setError({ ...error, emailError: "" });
  };
  const handlePassword = (value) => {
    setPassword(value);
    setError({ ...error, passwordError: "" });
  };

  const handlePhoneNo = (value) => {
    setPhoneNo(value);
    setError({ ...error, phoneNoError: "" });
  };

  const handleOTP = (value) => {
    setotp(value);
    setError({ ...error, otpError: "" });
  };

  const handleSignUp = async () => {
    const payload = {
      fullname: name,
      email,
      phoneNo,
      password,
    };
    let errors = {
      nameError: "",
      emailError: "",
      passwordError: "",
      phoneNoError: "",
    };
    if (!name) errors.nameError = "Name is required";
    if (!email) errors.emailError = "Email is required";
    if (!phoneNo) errors.phoneNoError = "phone Number is required";
    if (!password) errors.passwordError = "Pasword is required";
    setError(errors);
    setLoading1(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/sign-up`,
        payload,
        { withCredentials: true },
      );
      dispatch(setUser(result.data.user));
      setLoading1(false);
      toast.success(result.data.message);
      setstep(2);
    } catch (error) {
      setLoading1(false);
      if (!error.response) {
        toast.error("Low Network");
        return;
      }
      toast.error(error.response.data.message);
    }
  };

  const verifyOtp = async () => {
    setLoading1(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/verify-sign-up-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true },
      );
      setLoading1(false);
      toast.success(result.data.message);
      navigator('/');
    } catch (error) {
      setLoading1(false);
      toast.error(error.response.data.message);
    }
  };

  const handleAuthByGoogle = async () => {
    if (!phoneNo) {
      toast.error("Phone number is required");
      setError({ ...error, phoneNoError: "Phone number is required" });
      return null;
    }
    setLoading2(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const payload = {
        fullname: result.user.displayName,
        email: result.user.email,
        phoneNo: result.user.phoneNumber || phoneNo,
        role,
      };
      let { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        payload,
        { withCredentials: true },
      );
      dispatch(setUser(data.user));
      setLoading2(false);
      toast.success(data.message);
      navigator("/");
    } catch (error) {
      setLoading2(false);
      if (!error.response) {
        toast.error("Low Network");
        return;
      }
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="sign-up">
      <div className="sign-up-container">
        <div className="sign-up-wrapper">
          <div className="sign-in-left">
            <h1>Herboliya</h1>
            <h2>Nature’s Promise for India</h2>
            <p>
              Bringing the richness of traditional Indian spices directly to
              your kitchen. No chemicals. No shortcuts. Just real flavor.
            </p>
            <ul>
              <li>🌱 100% Natural Ingredients</li>
              <li>🧑‍🌾 Sourced from Indian farms</li>
              <li>🚚 Fast & Safe Delivery</li>
            </ul>
          </div>
          <div className="sign-up-form">
            {
              step == 1 ?
                <div className="sign-up-inner-form">
                  <div className="input-wrapper">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      placeholder="Enter name "
                      onChange={(e) => handleName(e.target.value)}
                      value={name}
                    />
                    <p>{error.nameError}</p>
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      placeholder="Enter email "
                      onChange={(e) => handleEmail(e.target.value)}
                      value={email}
                    />
                    <p>{error.emailError}</p>
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number "
                      onChange={(e) => handlePhoneNo(e.target.value)}
                      value={phoneNo}
                    />
                    <p>{error.phoneNoError}</p>
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="phoneNo">Password</label>
                    <input
                      type={toggle ? "text" : "password"}
                      placeholder="Enter Password "
                      onChange={(e) => handlePassword(e.target.value)}
                      value={password}
                    />
                    <button onClick={() => setToggle(!toggle)}>
                      {toggle ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <p>{error.passwordError}</p>
                  </div>
                  <button
                    className={loading1 ? "sign-up-btn loader" : "sign-up-btn"}
                    onClick={handleSignUp}
                    disabled={loading1}
                  >
                    {loading1 ? (
                      <BarLoader color="#fff" loading={loading1} />
                    ) : (
                      "Sign up"
                    )}
                  </button>
                  <button
                    className="google-auth-btn"
                    onClick={handleAuthByGoogle}
                    disabled={loading2}
                  >
                    {loading2 ? (
                      <HashLoader color="#fff" loading={loading2} size={25} />
                    ) : (
                      <div>
                        <FcGoogle />
                        sign up with google
                      </div>
                    )}
                  </button>
                  <h3>
                    Want to have a account ?
                    <span onClick={() => navigator("/sign-in")}> Sign in</span>
                  </h3>
                </div>
                :
                <div className="sign-up-inner-form">
                  <div className="input-wrapper">
                    <label htmlFor="otp">OTP</label>
                    <input
                      type="number"
                      placeholder="Enter OTP "
                      onChange={(e) => handleOTP(e.target.value)}
                      value={otp}
                      id="otp"
                    />
                    <p>{error.otpError}</p>
                  </div>
                  <button
                    className={loading1 ? "sign-up-btn loader" : "sign-up-btn"}
                    onClick={verifyOtp}
                    disabled={loading1}
                  >
                    {loading1 ? (
                      <BarLoader color="#fff" loading={loading1} />
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
