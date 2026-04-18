import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeLoading, setItems } from "../redux/shopSlice";
import { serverUrl } from "../App";
const useGetItems = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/item/get-items`,
          {
            withCredentials: true,
          },
        );
        dispatch(setItems(data.items));
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };

    fetchUser();
  }, []);
};

export default useGetItems;
