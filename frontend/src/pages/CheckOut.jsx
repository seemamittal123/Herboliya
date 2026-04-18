import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaCreditCard, FaLocationDot } from "react-icons/fa6";
import { FaRupeeSign, FaMobileAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addMyOrder } from "../redux/userSlice";
import { HashLoader } from "react-spinners";
import { serverUrl } from "../App";
const CheckOut = () => {
  const { cartItem, totalAmount, userData } = useSelector(
    (state) => state.user,
  );

  const [payMentMethod, setPayMentMethod] = useState("cod");
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loadding, setLoadding] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deliveryFee = totalAmount > 500 ? 0 : 150;
  const Amount = totalAmount + deliveryFee;

  const handleChange = (e) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.address || !deliveryAddress.phone) {
      return toast.error("Please fill delivery details");
    }
    setLoadding(true);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          payMentMethod,
          totalAmount: Amount,
          deliveryAddress,
          cartItem,
        },
        { withCredentials: true },
      );
      dispatch(addMyOrder(data.orders));
      toast.success(data.message);
      navigate("/order-place");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      setLoadding(false);
    }
  };
  useEffect(() => {
    setDeliveryAddress(userData.deliveryAddress);
  }, [userData]);
  return (
    <div className="checkout">
      <div className="checkout-header">
        <Link to="/cart" className="back-button">
          <FaArrowLeftLong />
        </Link>
        <h1 className="page-title">Order Checkout</h1>
      </div>

      <div className="checkout-container">
        {/* LEFT SIDE - DELIVERY & PAYMENT */}
        <div className="checkout-left">
          {/* DELIVERY ADDRESS SECTION */}
          <section className="checkout-section">
            <div className="section-header">
              <FaLocationDot className="section-icon" />
              <h2>Delivery Address</h2>
            </div>

            <form className="address-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    value={deliveryAddress.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    onChange={handleChange}
                    value={deliveryAddress.phone}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Enter your complete street address"
                  onChange={handleChange}
                  value={deliveryAddress.address}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City name"
                    onChange={handleChange}
                    value={deliveryAddress.city}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    placeholder="State name"
                    onChange={handleChange}
                    value={deliveryAddress.state}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    placeholder="6-digit pincode"
                    onChange={handleChange}
                    value={deliveryAddress.pincode}
                  />
                </div>
              </div>
            </form>
          </section>

          {/* PAYMENT METHOD SECTION */}
          <section className="checkout-section">
            <div className="section-header">
              <FaCreditCard className="section-icon" />
              <h2>Payment Method</h2>
            </div>

            <div className="payment-options">
              <div
                className={`payment-option ${payMentMethod === "cod"}`}
              >
                <div className="radio-input">
                </div>
                <div className="payment-icon">
                  <MdDeliveryDining />
                </div>
                <div className="payment-info">
                  <h3>Cash On Delivery</h3>
                  <p>Pay when your order arrives</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <aside className="checkout-right">
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="items-list">
              {cartItem.map((item, idx) => (
                <div key={idx} className="summary-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x {item.quantity}</span>
                  </div>
                  <span className="item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span className="label">Subtotal</span>
              <span className="value">₹{totalAmount}</span>
            </div>

            <div className="summary-row">
              <span className="label">Delivery Fee</span>
              <span className={`value ${deliveryFee === 0 ? "free" : ""}`}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="summary-total">
              <span className="label">Total Amount</span>
              <span className="amount">₹{Amount}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className={`place-order-btn ${loadding ? "loading" : ""}`}
              disabled={loadding}
            >
              {loadding ? (
                <HashLoader color="#fff" size={20} />
              ) : (
                <>
                  <span>Place Order</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckOut;
