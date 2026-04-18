import React from "react";
import { FaArrowLeftLong, FaIndianRupeeSign } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

const Cart = () => {
  const { cartItem, totalAmount } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="inner-container">
        <div className="cart-container">
          <div className="nav-header">
            <Link to="/items" className="back-link">
              <FaArrowLeftLong size={23} />
            </Link>
            <h2 className="heading">Your Cart</h2>
          </div>

          {cartItem.length === 0 ? (
            <div className="empty">
              <h2>Your cart is empty</h2>
            </div>
          ) : (
            <div className="cart-item-wrapper">
              {cartItem.map((item) => (
                <CartItemCard key={item._id} item={item} />
              ))}

              <div className="cart-summary">
                <div className="summary-content">
                  <span className="summary-label">Order Total</span>
                  <span className="summary-amount">₹{totalAmount}</span>
                </div>
                <button
                  className="check-out"
                  onClick={() => navigate("/checkOut")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
