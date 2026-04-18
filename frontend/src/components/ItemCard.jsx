import React from "react";
import { HiMiniPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const ItemCard = ({ item, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <article className="owner-item-card">
      <div className="item-card-media">
        <img src={item.image} alt={item.name || "Food item"} />
      </div>

      <div className="item-card-content">
        <div className="item-card-title">
          <div>
            <span className="item-badge">Featured</span>
            <h3>{item.name}</h3>
          </div>
          <span className="item-price">₹{item.price}</span>
        </div>

        <p>{item.discription || "No description available."}</p>

        <div className="item-card-meta">
          <span className="status available">Available</span>
          <span className="item-code">#{item._id?.slice(-6)}</span>
        </div>
      </div>

      <div className="item-card-actions">
        <button
          type="button"
          className="edit"
          onClick={() => navigate(`/edit-item/${item._id}`)}
        >
          <HiMiniPencil />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="delete"
          onClick={() => handleDelete(item._id)}
        >
          <MdDelete />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
};

export default ItemCard;
