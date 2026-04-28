import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import heroimg from "../assets/heroimg.png";
import Chilli from "../assets/redChilli.png";
import tumeric from "../assets/turmeric.png";
import boxTumeric from "../assets/box.png";
import { FaTruck, FaLeaf, FaWallet, FaRecycle } from "react-icons/fa";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Red Chilli",
    category: "Spice",
    image: Chilli,
  },
  {
    id: 2,
    name: "Tumeric",
    category: "Spice",
    image: tumeric,
  },
  {
    id: 3,
    name: "Tumeric Box",
    category: "Spice",
    image: boxTumeric,
  },
  {
    id: 4,
    name: "Natural",
    category: "Dry fruits",
    sale: true,
    image: Chilli,
  },
];

const features = [
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    subtitle: "Across India",
  },
  {
    icon: <FaLeaf />,
    title: "Authentic Taste",
    subtitle: "Rich & Traditional Flavors",
  },
  {
    icon: <FaWallet />,
    title: "Best Value Prices",
    subtitle: "Quality at Fair Rates",
  },
  {
    icon: <FaRecycle />,
    title: "Freshly Packed",
    subtitle: "Sealed for Freshness",
  },
];
const Home = () => {
  const navigater = useNavigate();

  return (
    <>
      <section className="section1">
        <div className="container-hero">
          <div className="hero">
            <div className="hero-left">
              <img
                src={heroimg}
                alt="Organic Products"
                className="hero-image"
              />
            </div>

            {/* RIGHT SIDE (CONTENT) */}
            <div className="hero-right">
              <p className="tagline">100% Natural Taste & Chemical-Free</p>

              <h1>
                Taste the Real <br /> Essence of Spices
              </h1>

              <p className="description">
                Handpicked spices and carefully selected dry fruits, processed
                in small batches to deliver unmatched freshness, rich flavor,
                and authentic quality.
              </p>

              {/* <link to="/items"> */}
              <button className="shop-btn" onClick={() => navigater("/items")}>
                <FaShoppingCart /> SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="marquee">
        <div className="marquee-track">
          <span>
            ♥ #Nature’s Promise for <strong>India</strong>
          </span>

          {/* duplicate for seamless loop */}
          <span>
            ♥ #Nature’s Promise for <strong>India</strong>
          </span>
          <span>
            ♥ #Nature’s Promise for <strong>India</strong>
          </span>
          <span>
            ♥ #Nature’s Promise for <strong>India</strong>
          </span>
        </div>
      </div>

     

      <section className="best-selling">
        <div className="container">
          <h2 className="title">Best Selling Products</h2>
          <div className="products">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>
                <p className="category">{product.category}</p>
                <h3 className="name">{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
 <section>
        <div className="Background_Image">
          <div className="opacity"></div>
          <p className="Background_Image_line" >
            “Good food fills the stomach, but great flavor fills the heart.
            That’s the magic of real masala.”
          </p>
        </div>
      </section>

      <section className="feature-bar">
        <div className="feature-container">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="icon">{item.icon}</div>
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
