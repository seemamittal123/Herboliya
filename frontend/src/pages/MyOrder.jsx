import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import UserOrderCard from '../components/UserOrderCard'
import OwnerOrderCard from '../components/OwnerOrderCard'
import { BarLoader } from 'react-spinners';
import useGetMyOrder from '../hooks/useGetMyOrder'
import axios from 'axios'
import { toast } from 'react-toastify'
import { serverUrl } from '../App';

const MyOrder = () => {
  const { userData, myOrder } = useSelector(state => state.user);
  useGetMyOrder();
  const handleCancel = async (id) => {
    try {
      const { data } = await axios.delete(`${serverUrl}/api/order/cancel-order/${id}`, { withCredentials: true })
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='my-orders'>
      <div className='inner-container'>
        <div className="nav-header">
          <Link to="/items" className="back-link">
            <FaArrowLeftLong size={23} />
          </Link>
          <h2 className='heading'>My Orders</h2>
        </div>

        <div className="orders-wrapper">
          {
            !Array.isArray(myOrder) ?
              <h1 className="spinner">
                <BarLoader color=" #7cc242" width={200} />
              </h1> :
              myOrder?.length > 0 ?
                myOrder?.map((order, key) => {
                  if (userData.role == 'user') {
                    return <UserOrderCard order={order} id={key} handleCancel={handleCancel} />
                  }
                  else {
                    return <OwnerOrderCard order={order} id={key} />
                  }
                }) :
                <h1 className='spinner'>No Orders</h1>
          }

        </div>
      </div>
    </div>
  )
}

export default MyOrder