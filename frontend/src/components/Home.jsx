import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import heroimg from "../assets/heroimg.png";
import Chilli from "../assets/redChilli.png";
import tumeric from "../assets/turmeric.png";
import boxTumeric from "../assets/box.png";
import { FaTruck, FaLeaf, FaWallet, FaRecycle } from "react-icons/fa";
import { useSelector } from "react-redux";
import Card from "./Card";

const products = [
  {
    id: 1,
    name: "Assorted Coffee",
    category: "Groceries",
    price: 35,
    image: Chilli,
  },
  {
    id: 2,
    name: "Hand Sanitizer",
    category: "Groceries",
    price: 15,
    image: tumeric,
  },
  {
    id: 3,
    name: "Handpicked Red Chillies",
    category: "Groceries",
    price: 19,
    image: boxTumeric,
  },
  {
    id: 4,
    name: "Natural Extracted Edible Oil",
    category: "Groceries",
    price: 25,
    oldPrice: 34,
    sale: true,
    image: Chilli,
  },
];

const features = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    subtitle: "Above $5 Only",
  },
  {
    icon: <FaLeaf />,
    title: "Certified Organic",
    subtitle: "100% Guarantee",
  },
  {
    icon: <FaWallet />,
    title: "Huge Savings",
    subtitle: "At Lowest Price",
  },
  {
    icon: <FaRecycle />,
    title: "Easy Returns",
    subtitle: "No Questions Asked",
  },
];
const Home = () => {
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
              <p className="tagline">Best Quality Products</p>

              <h1>
                Join The Organic <br /> Movement!
              </h1>

              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>

              {/* <link to="/items"> */}
              <button className="shop-btn">
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

      <section className="best-selling">
        <div className="container">
          <h2 className="title">Best Selling Products</h2>
          <div className="products">
            {products.map((product) => (
              <div className="card" key={product.id}>
                {/* {product.sale && <span className="badge">Sale!</span>} */}

                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>

                <p className="category">{product.category}</p>

                <h3 className="name">{product.name}</h3>

                <div className="price">
                  {product.oldPrice && (
                    <span className="old">£{product.oldPrice}.00</span>
                  )}
                  <span className="current">£{product.price}.00</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
