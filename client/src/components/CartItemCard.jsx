import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteCart, updateQuantity } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const CartItemCard = ({ item }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const dispatch = useDispatch();

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      dispatch(deleteCart(item));
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const deleteItem = () => {
    dispatch(deleteCart(item));
  };

  useEffect(() => {
    if (quantity > 0)
      dispatch(
        updateQuantity({
          _id: item._id,
          quantity,
        })
      );
  }, [quantity, dispatch, item._id]);

  const totalPrice = item.price * quantity;
  const savings = item.price * 0.1 * quantity; // Assuming 10% savings for demo

  return (
    <article className="cart-item-card">
      {/* Product Image */}
      <div className="product-image-section">
        <div className="product-badge">Item</div>
        <img src={item.image} alt={item.name || "Cart item"} />
      </div>

      {/* Product Details */}
      <div className="product-details-section">
        <div className="product-header">
          <h3 className="product-name">{item.name}</h3>
          <span className="product-price">₹{item.price}</span>
        </div>

        <div className="product-info-grid">
          <div className="info-item">
            <span className="info-label">Unit Price</span>
            <span className="info-value">₹{item.price}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Qty</span>
            <span className="info-value">{quantity}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Calculation</span>
            <span className="info-value">{item.price} x {quantity}</span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="product-actions-section">
        {/* Quantity Control */}
        <div className="quantity-controller">
          <button
            type="button"
            className="qty-btn qty-decrease"
            onClick={handleDecreaseQuantity}
            aria-label="Decrease quantity"
            title="Decrease quantity"
          >
            <FaMinus />
          </button>
          <span className="qty-value">{quantity}</span>
          <button
            type="button"
            className="qty-btn qty-increase"
            onClick={handleIncreaseQuantity}
            aria-label="Increase quantity"
            title="Increase quantity"
          >
            <FaPlus />
          </button>
        </div>

        {/* Total Price */}
        <div className="total-price-display">
          <div className="price-label">Total Price</div>
          <div className="price-value">₹{totalPrice}</div>
        </div>

        {/* Delete Button */}
        <button
          type="button"
          className="remove-btn"
          onClick={deleteItem}
          aria-label="Remove from cart"
          title="Remove item from cart"
        >
          <MdDelete />
          <span>Remove</span>
        </button>
      </div>
    </article>
  );
};

export default CartItemCard;
