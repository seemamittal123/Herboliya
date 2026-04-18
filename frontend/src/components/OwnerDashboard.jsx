import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoFastFood } from "react-icons/io5";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import axios from "axios";
import { removeLoading, updateItems } from "../redux/shopSlice";
import { BarLoader } from "react-spinners";
import useGetItems from "../hooks/useGetItems";
import Header from "./Header";
import { serverUrl } from "../App";
const OwnerDashboard = () => {
  const { items, loading } = useSelector((state) => state.shop);
  const [toggle, setToggle] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();

  useGetItems();

  const handleDelete = (id) => {
    setDeleteId(id);
    setToggle(true);
  };


  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(
        `${serverUrl}/api/item/delete-item/${deleteId}`,
        { withCredentials: true },
      );
      dispatch(updateItems(items.filter((item) => item._id !== deleteId)));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setToggle(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setToggle(false);
    setDeleteId(null);
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="owner-dashBoard-inner">
          <div className="shop">
            {loading ? (
              <div className="empty">
                <BarLoader width={200} color="#ff7700" />
              </div>
            ) : items?.length > 0 ? (
              <div className="items-wrapepr">
                {items.map((item, idx) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    idx={idx}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="model-wrapper">
                <div className="add-res-model">
                  <div className="top">
                    <IoFastFood />
                  </div>
                  <h1 className="heading">Add Food Item</h1>
                  <p className="pera">
                    Add a new delicious dish to your restaurant menu and make it
                    available for customers to explore and order.
                  </p>
                  <Link to="/add-item" className="get-start-btn">
                    Add Food Item
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {toggle && (
        <div className="model delete-confirm">
          <div className="modal-content">
            <h3>Confirm deletion</h3>
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-actions">
              <button className="btn1" onClick={confirmDelete}>
                Yes
              </button>
              <button className="btn2" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerDashboard;
