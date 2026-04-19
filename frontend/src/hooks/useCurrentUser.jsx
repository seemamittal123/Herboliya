import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, clearUser, startAuthCheck } from "../redux/userSlice";
import { serverUrl } from "../App";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      dispatch(startAuthCheck());
      try {
        const res = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data) {
          dispatch(setUser(res.data));
        } else {
          dispatch(clearUser());
        }
      } catch (err) {
        // On any error, clear user state
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;
