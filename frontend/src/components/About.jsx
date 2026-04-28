
import React from "react";
import Founder from "../assets/person1.png";
import Co_Founder from "../assets/person2.png";
import Quality from "../assets/person3.jpeg";

const About = () => {
  return (
    <section className="about">
      {/* HERO */}
      <div className="about-hero">
        <h1>About Herboliya</h1>
        <p>Bringing the true essence of spices back to your kitchen.</p>
      </div>

      {/* STORY */}
      <div className="about-section">
        <div>
          <h2>Our Story</h2>
          <div className="line"></div>
        </div>
        <p>
          Herboliya was born from a simple belief — that real spices should not
          just add color, but bring life to every dish. In today’s fast-paced
          world, the natural aroma and richness of spices are often lost in mass
          production. We wanted to change that. Starting with a passion for
          authentic taste, Herboliya focuses on delivering spices that remind
          you of traditional kitchens — rich in flavor, pure in quality, and
          full of freshness.
        </p>
      </div>

      {/* FEATURES */}
      <div className="about-features">
        <h2>What Makes Us Different</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span>🌿</span>
            <h4>100% Natural</h4>
          </div>
          <div className="feature-card">
            <span>🏺</span>
            <h4>Traditional Methods</h4>
          </div>
          <div className="feature-card">
            <span>🚫</span>
            <h4>No Chemicals</h4>
          </div>
          <div className="feature-card">
            <span>📦</span>
            <h4>Fresh Packaging</h4>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="about-cta">
        <h2>Rediscover Real Taste</h2>
        <p>Herboliya — जहाँ स्वाद है असली।</p>
      </div>

      {/* TEAM */}
      <div className="about-team">
        <div>

        <h2>Meet Our Team</h2>
        <div className="line"></div>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <img src={Founder} alt="team" />
            <h4>Arun Kumar</h4>
            <p>Founder</p>
          </div>

          <div className="team-card">
            <img src={Co_Founder} alt="team" />
            <h4> Dev Verma</h4>
            <p>CO Founder</p>
          </div>

          <div className="team-card">
            <img src={Quality} alt="team" />
            <h4>Ankit Singh</h4>
            <p>Quality Control</p>
          </div>
        </div>
      </div>

      {/* PHILOSOPHY */}
      <div className="about-section">
       
         <div>
           <h2>Our Philosophy</h2>
          <div className="line"></div>
        </div>
        <p>
          We believe that spices are the heart of every kitchen. That’s why we
          focus on quality over quantity — selecting the best raw materials and
          processing them with care.
        </p>
      </div>
    </section>
  );
};

export default About;
