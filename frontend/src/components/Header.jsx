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
  const dispatch = useDispatch();

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

  const closeMenu = () => {
    setToggle(false);
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
              <li onClick={() => window.scrollTo(0, 0)}>
                <Link to="/" onClick={closeMenu}>
                  <div className="icon" >
                    <FaHome />
                  </div>
                  <p>Home</p>
                </Link>
              </li>
              <li onClick={() => window.scrollTo(0, 0)}>
                <Link to="/items" onClick={closeMenu}>
                  <div className="icon">
                    <FaDatabase />
                  </div>
                  <p>Items</p>
                </Link>
              </li>
              <li onClick={() => window.scrollTo(0, 0)}>
                <Link to="/about" onClick={closeMenu}>
                  <div className="icon">
                    <FaListAlt />
                  </div>
                  <p>About</p>
                </Link>
              </li>
              <li onClick={() => window.scrollTo(0, 0)}>
                <Link to="/contact" onClick={closeMenu}>
                  <div className="icon">
                    <IoIosCall />
                  </div>
                  <p>Contact</p>
                </Link>
              </li>
              {userData?.role == "admin" && (
                <li onClick={() => window.scrollTo(0, 0)}>
                  <Link to="/admin-dashboard" onClick={closeMenu}>
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
                  <li onClick={() => window.scrollTo(0, 0)}>
                    <Link to="/likes" onClick={closeMenu}>
                      <FaHeart size={20} />
                      <p className="icon">Like</p>
                    </Link>
                  </li>
                  {userData?.role == "admin" && (
                    <li onClick={() => window.scrollTo(0, 0)}>
                      <Link to="/add-item" onClick={closeMenu}>
                        <FaPlus />
                        <div className="icon">
                          <p>Add Food Item</p>
                        </div>
                      </Link>
                    </li>
                  )}

                  <li onClick={() => window.scrollTo(0, 0)}>
                    <Link to="/my-orders" onClick={closeMenu}>
                      <FaClipboardList size={21} />
                      <div className="icon">
                        <p className="icon">My Order</p>
                      </div>
                    </Link>
                  </li>
                  {userData?.role == "user" && (
                    <li onClick={() => window.scrollTo(0, 0)}>
                      <Link to="/cart" onClick={closeMenu}>
                        <FaCartPlus size={21} />
                        <span>{cartItem?.length || 0}</span>
                        <div className="icon">
                          <p>Cart</p>
                        </div>
                      </Link>
                    </li>
                  )}

                  <li onClick={() => window.scrollTo(0, 0)}>
                    <button type="button" onClick={() => { handleLogOut(); closeMenu(); }}>
                      <MdLogout size={20} />
                      <p className="icon">Log out</p>
                    </button>
                  </li>
                </ul>
                :
                <Link to="/sign-in" className="signin-btn" onClick={closeMenu}>
                  <button>

                    Sign In
                  </button>
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
