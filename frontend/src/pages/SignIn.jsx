import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { BarLoader, HashLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice.js";
import { serverUrl } from "../App.jsx";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    const payload = {
      email,
      password,
    };
    setLoading1(true);
    if (!email && !password) {
      setLoading1(false);
      toast.error("All filed are required");
      return;
    }
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/sign-in`,
        payload,
        { withCredentials: true },
      );
      dispatch(setUser(result.data.user));
      setLoading1(false);
      toast.success(result.data.message);
      navigator("/");
    } catch (error) {
      setLoading1(false);
      if (!error.response) {
        toast.error("Low Network");
        return;
      }
      toast.error(error.response.data.message);
    }
  };
  const handleAuthByGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setLoading2(true);
    try {
      let { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        { email: result.user.email },
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

    <div className="sign-in">
      <div className="sign-in-container">

        <div className="sign-in-wrapper">
          <div className="sign-in-left">
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
          <div className="sign-in-form">

            <div className="sign-in-inner-form">
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter email "
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type={toggle ? "text" : "password"}
                  placeholder="Enter Password "
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button onClick={() => setToggle(!toggle)}>
                  {toggle ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <Link to="/forgot-password">Forgot Password?</Link>
              <button
                className={loading1 ? "sign-in-btn loader" : "sign-in-btn"}
                onClick={handleSignIn}
                disabled={loading1}
              >
                {loading1 ? (
                  <BarLoader color="#fff" loading={loading1} />
                ) : (
                  "Sign in"
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
                  <div className="button-innner">
                    <FcGoogle />
                    sign in with google
                  </div>
                )}
              </button>
              <h3>
                Want to create a account ?
                <span onClick={() => navigator("/sign-up")}> Sign up</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
