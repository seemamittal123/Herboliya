import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import useGetLike from "../hooks/useGetLike";
const MyLikes = () => {
  const { likedItems } = useSelector((state) => state.user);
  const [likes, setLikes] = useState([]);

  useGetLike();
  useEffect(() => {
    setLikes(likedItems);
  }, [likedItems]);
  return (
    <div className="likes-container">
      <div className="inner-container">
        <div className="nav-header">
          <Link to="/items" className="back-link">
            <FaArrowLeftLong size={23} />
          </Link>
          <h2 className="heading">Likes</h2>
        </div>

        <div className="items">
          <div className="inner-container">
            <div className="item-card">
              {likes.length > 0 ? (
                likes.map((item, idx) => <Card item={item} key={idx} />)
              ) : (
                <h2 className="empty">No Likes</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLikes;
