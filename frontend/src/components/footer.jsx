import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import whiteLogo from "../assets/WhiteLogo.png";

const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-left">
          <div>
            <Link to="/">
              <img src={whiteLogo} className="logo" />
            </Link>
          </div>

          <p>
            Maecenas mi justo,
            <br />
            interdum at consectetur vel,
            <br />
            tristique et arcu.
          </p>
        </div>

        {/* COLUMNS */}
        <div className="footer-column">
          <h3>Website</h3>
          <ul>
            <li  onClick={() => window.scrollTo(0, 0)}>
              <Link to="/" > Home </Link>
            </li>
            <li onClick={() => window.scrollTo(0, 0)}>
              <Link to="/items"> Items </Link>
            </li>
            <li onClick={() => window.scrollTo(0, 0)}>
              <Link to="/about"> About </Link>
            </li>
            <li onClick={() => window.scrollTo(0, 0)}>
              <Link to="/contact"> Contact </Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/"> Know More About Us </Link>
            </li>
            <li>
              <Link to="/"> Visit Store </Link>
            </li>
            <li>
              <Link to="/"> Let’s Connect </Link>
            </li>
            <li>
              <Link to="/"> Locate Stores </Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Site Links</h3>
          <ul>
            <li>
              <Link to="/"> Privacy Policy </Link>
            </li>
            <li>
              <Link to="/"> Shipping Details </Link>
            </li>
            <li>
              <Link to="/"> Offers Coupons </Link>
            </li>
            <li>
              <Link to="/"> Terms & Conditions </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2026 | Herbolya Store</p>

        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
