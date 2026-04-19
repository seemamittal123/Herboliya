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
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import logo from "../assets/logo.png";
import { IoAppsOutline } from "react-icons/io5";
import { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { serverUrl } from "../App";
import useCurrentUser from "../hooks/useCurrentUser";
import { clearUser } from "../redux/userSlice";

const Header = () => {
  const { cartItem } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigater = useNavigate();
  const dispatch=useDispatch()
  const handleLogOut = async () => {
    try {
      let { data } = await axios.get(`${serverUrl}/api/auth/log-out`, {
        withCredentials: true,
      });
      toast.success(data.message);
      navigater("/");
      dispatch(clearUser());
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };

  const handleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <header className="userheader">
      <div className="header-user-containre">
        <div className="header-user-inner">
          <div>
            <Link to="/">
              <img src={logo} className="logoimg" />
            </Link>
          </div>
          <div className={toggle ? "menu open" : "menu"}>
            <ul className="header-user-inner-list">
              <li>
                <Link to="/">
                  <div className="icon">
                    <FaHome />
                  </div>
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link to="/items">
                  <div className="icon">
                    <FaDatabase />
                  </div>
                  <p>Items</p>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <div className="icon">
                    <FaListAlt />
                  </div>
                  <p>About</p>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <div className="icon">
                    <IoIosCall />
                  </div>
                  <p>Contact</p>
                </Link>
              </li>
              {userData?.role == "admin" && (
                <li>
                  <Link to="/admin-dashboard">
                    <div className="icon">
                      <MdDashboard />
                    </div>
                    <p>DashBoard</p>
                  </Link>
                </li>
              )}
            </ul>
            {
              userData ?
                <ul className="header-user-inner-list list">
                  <li>
                    <Link to="/likes">
                      <FaHeart size={20} />
                      <p className="icon">Like</p>
                    </Link>
                  </li>
                  {userData?.role == "admin" && (
                    <li>
                      <Link to="/add-item">
                        <FaPlus />
                        <div className="icon">
                          <p>Add Food Item</p>
                        </div>
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link to="/my-orders">
                      <FaClipboardList size={21} />
                      <div className="icon">
                        <p className="icon">My Order</p>
                      </div>
                    </Link>
                  </li>
                  {userData?.role == "user" && (
                    <li>
                      <Link to="/cart">
                        <FaCartPlus size={21} />
                        <span>{cartItem?.length || 0}</span>
                        <div className="icon">
                          <p>Cart</p>
                        </div>
                      </Link>
                    </li>
                  )}

                  <li>
                    <button type="button" onClick={handleLogOut}>
                      <MdLogout size={20} />
                      <p className="icon">Log out</p>
                    </button>
                  </li>
                </ul>
                :
                <Link to="/sign-in" className="signin-btn">
                  Sign In
                </Link>
            }
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
