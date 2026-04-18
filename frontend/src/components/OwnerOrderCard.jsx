import React, { useEffect } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { MdPhone } from 'react-icons/md'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../redux/userSlice';
import { serverUrl } from '../App';
const OwnerOrderCard = ({ order, id }) => {
  const dispatch = useDispatch()
  const handleStatus = async (orderId, status) => {
    try {
      let { data } = await axios.post(`${serverUrl}/api/order/update-status/${orderId}`, { status }, { withCredentials: true })
      dispatch(updateOrderStatus({ orderId, status }))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='owner-card' key={id}>
      <div className="header">
        <h2>{order?.deliveryAddress.name}</h2>
        <p>
          <MdPhone />
          <span>
            {order?.user?.phoneNo}
          </span>
        </p>
        <p>
          <FaLocationDot />
          <span>
            {order?.deliveryAddress?.address}
          </span>
        </p>
        <div className="address-wrapper">
          <p>
            <span>
              {order?.deliveryAddress?.city}
            </span>
          </p>
          <p>
            <span>
              {order?.deliveryAddress?.state}
            </span>
          </p>
          <p>
            <span>
              {order?.deliveryAddress?.pincode}
            </span>
          </p>
        </div>
      </div>
      <div className="shops-wrapper">
        {
          <>
            <div className='shops'>
              {
                order?.items?.map((item, idx) =>
                (
                  <div key={idx} className='wrapper'>
                    <div className="image-wrapper">
                      <img src={item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p className='price'>Qty : {item.quantity} x ₹ {item.price} </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="status-container">
              <div className="status">
                status :
                <span > {order?.status}</span>
              </div>
              <select id="status" onChange={(e) => handleStatus(order._id, e.target.value)}>
                <option value="">Choose status</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="out of delivery">Out of Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="subtotal">
              Total :
              <span>
                ₹{order.totalAmount}
              </span>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default OwnerOrderCard