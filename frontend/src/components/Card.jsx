import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeLikedItem, addLikedItem } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";

const Card = ({ item }) => {
  const { cartItem, likedItems, userData } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDecreaseQuantity = () => {
    if (userData == null) {
      navigate('/sign-in');
      return;
    }
    if (quantity > 0) setQuantity(quantity - 1);
  };
  const handleIncreaseQuantity = () => {
    if (userData == null) {
      navigate('/sign-in');
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleCart = () => {
    if (userData == null) {
      navigate('/sign-in');
      return;
    }
    if (quantity > 0) {
      toast.success('Successfully add to cart');
      dispatch(
        addToCart({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity,
          image: item.image,
        }),
      );
    }
  };

  const handleLike = async (id) => {
    if (userData == null) {
      navigate('/sign-in');
      return;
    }

    const nextLiked = !toggle;
    setToggle(nextLiked);
    if (nextLiked) {
      dispatch(addLikedItem(item));
    } else {
      dispatch(removeLikedItem(id));
    }

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/item/like/${id}`,
        {},
        { withCredentials: true },
      );

      if (data.liked !== nextLiked) {
        setToggle(data.liked);
        if (data.liked) {
          dispatch(addLikedItem(item));
        } else {
          dispatch(removeLikedItem(id));
        }
      }
    } catch (error) {
      console.log(error);
      setToggle(!nextLiked);
      if (nextLiked) {
        dispatch(removeLikedItem(id));
      } else {
        dispatch(addLikedItem(item));
      }
    }
  };

  useEffect(() => {
    const isLiked = likedItems.some((i) => i._id == item._id);
    setToggle(isLiked);
  }, [likedItems, item._id]);

  return (
    <div className="spice-card">
      <div className="card-img">
        <img src={item.image} alt="" />
        <span className="heart">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike(item._id);
            }}
            className="like-btn"
          >
            {!toggle ? <FaRegHeart /> : <FaHeart />}
          </button>
        </span>
      </div>

      <div className="card-content">
        <div className="top">
          <h2>{item.name}</h2>
          <h3>₹{item.price}</h3>
        </div>

        <p className="discription">{item.discription}</p>

        <div className="card-footer">
          <div className="qty-box">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDecreaseQuantity();
              }}
            >
              -
            </button>
            <span>{quantity || 0}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleIncreaseQuantity();
              }}
            >
              +
            </button>
          </div>

          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCart();
            }}
            style={
              cartItem.some((i) => i._id == item._id)
                ? {
                  backgroundColor: "transparent",
                  color: "#fcfcfc",
                  border: "1px solid #111184",
                }
                : {}
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
