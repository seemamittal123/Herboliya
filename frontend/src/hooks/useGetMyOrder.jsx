import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders } from '../redux/userSlice'
import { serverUrl } from '../App'
const useGetMyOrder = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/order/my-orders`, { withCredentials: true });
        dispatch(setMyOrders(data.orders));
      } catch (error) {
        console.log(error);
      }

    }
    fetchData()
  }, [])
}

export default useGetMyOrder