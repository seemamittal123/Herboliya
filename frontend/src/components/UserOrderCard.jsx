import React from 'react'

const UserOrderCard = ({ order, id, handleCancel }) => {
  return (
    <div className="my-orders" key={id}>
      <div className="inner-container">
        <div className='user-card'>
          <div className="top-header">
            <div className="left">
              <h1>order # {order?._id.slice(-6)}</h1>
              <h2>
                Date :
                {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </h2>
            </div>
            <div className="right">
              <h1>{order?.payment.toUpperCase()}</h1>
              <h2 className={`${order?.status} status`}>{order?.status}</h2>
            </div>
          </div>
          <div className="order-shops-wrapper">
            {
              <div key={id} className='shop'>
                <div className="shops">
                  {
                    order?.items.map((item, idx) =>
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
                <div className='bottom'>
                  <p className='status'>Status : {order?.status}</p>
                </div>
              </div>
            }
          </div>
          <div className="total-amount">
            <p>Total : {order?.totalAmount}</p>
            <button onClick={() => handleCancel(order?._id)} disabled={order?.status == "delivered" ? true : false} 
            style={order?.status == "delivered" ? {backgroundColor:'grey'} : {}}
            >Cancel Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserOrderCard