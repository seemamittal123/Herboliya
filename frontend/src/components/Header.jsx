import { toast } from "react-toastify";
import {
  FaHeart,
  FaCartPlus,
  FaHome,
  FaDatabase,
  FaListAlt,
  FaPlus,
} from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import logo from "../assets/logo.png";
import { IoAppsOutline } from "react-icons/io5";
import { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { serverUrl } from "../App";

const Header = () => {
  const { cartItem } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigater = useNavigate();

  const handleLogOut = async () => {
    try {
      let { data } = await axios.get(`${serverUrl}/api/auth/log-out`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setToggle(false);
      navigater("/sign-in");
    } catch (error) {
      console.log(error);

      toast.error("Logout Failed");
    }
  };

  const handleMenu = () => {
    setToggle(!toggle);
  };

  const handleLinkClick = () => {
    setToggle(false);
  };

  return (
    <header className="userheader">
      <div className="header-user-containre">
        <div className="header-user-inner">
          <div>
            <Link to="/" onClick={handleLinkClick}>
              <img src={logo} className="logoimg" />
            </Link>
          </div>
          <div className={toggle ? "menu open" : "menu"}>
            <ul className="header-user-inner-list">
              <li>
                <Link to="/" onClick={handleLinkClick}>
                  <div className="icon">
                    <FaHome />
                  </div>
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link to="/items" onClick={handleLinkClick}>
                  <div className="icon">
                    <FaDatabase />
                  </div>
                  <p>Items</p>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleLinkClick}>
                  <div className="icon">
                    <FaListAlt />
                  </div>
                  <p>About</p>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleLinkClick}>
                  <div className="icon">
                    <IoIosCall />
                  </div>
                  <p>Contact</p>
                </Link>
              </li>
              {userData?.role == "admin" && (
                <li>
                  <Link to="/admin-dashboard" onClick={handleLinkClick}>
                    <div className="icon">
                      <MdDashboard />
                    </div>
                    <p>DashBoard</p>
                  </Link>
                </li>
              )}
            </ul>
            <ul className="header-user-inner-list list">
              <li>
                <Link to="/likes" onClick={handleLinkClick}>
                  <FaHeart size={20} />
                  <p className="icon">Like</p>
                </Link>
              </li>
              {userData?.role == "admin" && (
                <li>
                  <Link to="/add-item" onClick={handleLinkClick}>
                    <FaPlus />
                    <div className="icon">
                      <p>Add Food Item</p>
                    </div>
                  </Link>
                </li>
              )}

              <li>
                <Link to="/my-orders" onClick={handleLinkClick}>
                  <FaClipboardList size={21} />
                  <div className="icon">
                    <p className="icon">My Order</p>
                  </div>
                </Link>
              </li>
              {userData?.role == "user" && (
                <li>
                  <Link to="/cart" onClick={handleLinkClick}>
                    <FaCartPlus size={21} />
                    <span>{cartItem?.length || 0}</span>
                    <div className="icon">
                      <p>Cart</p>
                    </div>
                  </Link>
                </li>
              )}

              <li onClick={handleLogOut}>
                <MdLogout size={20} />
                <p className="icon">Log out</p>
              </li>
            </ul>
          </div>
          <div className="menu-icon" onClick={handleMenu}>
            {toggle ? <ImCross size={25} /> : <IoAppsOutline size={25} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
