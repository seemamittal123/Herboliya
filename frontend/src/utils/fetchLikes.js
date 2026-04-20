import axios from "axios";
import { serverUrl } from "../App";

export const fetchLikes = async (dispatch, setLikes) => {
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