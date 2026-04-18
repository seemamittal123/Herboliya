import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
const OrderPlaced = () => {
  const navigate = useNavigate();
  return (
    <div className="inner-container">
      <div className='place-container'>
        <Link to="/" className="back-link">
          <FaArrowLeftLong  />
        </Link> 
        <div className="text-section">
          <FaCheckCircle />
          <h1>Order Placed!</h1>
          <p>Thank you for your purchase. Your order is being prepared.You can track order status in the "My Orders" section</p>
          <button onClick={()=>navigate('/my-orders')}>Go to my order</button>
        </div></div>
    </div>
  )
}

export default OrderPlaced