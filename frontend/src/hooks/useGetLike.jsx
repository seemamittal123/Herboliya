import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLikes } from "../redux/userSlice";
import { serverUrl } from "../App";
const useGetLike = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/item/likes`,
          {
            withCredentials: true,
          },
        );
        dispatch(setLikes(data.likedItems));
      } catch (err) {
        console.log(err);
      }
    };
    fetchLikes();
  }, []);
};

export default useGetLike;
