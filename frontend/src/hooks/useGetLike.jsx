import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLikes } from "../redux/userSlice";
import { fetchLikes } from "../utils/fetchLikes";

const useGetLike = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchLikes(dispatch, setLikes);
  }, [dispatch]);

  return () => fetchLikes(dispatch, setLikes);
};

export default useGetLike;
