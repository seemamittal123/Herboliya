import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const faqData = [
  {
    question: "How do you ensure the freshness and quality of your spices?",
    answer:
      "We source our spices directly from trusted farmers and process them in small batches to maintain maximum freshness. Each product is carefully cleaned, ground, and packed in airtight packaging to preserve aroma, flavor, and nutritional value."
  },
  {
    question: "Are your masalas free from additives and preservatives?",
    answer:
      "Yes, all our masalas are 100% natural and free from artificial colors, flavors, and preservatives. We focus on delivering pure and authentic spice blends."
  },
  {
    question: "How should I store spices to keep them fresh for longer?",
    answer:
      "Store spices in a cool, dry place away from direct sunlight and moisture. Always keep them in airtight containers to retain their flavor and potency."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq">
      <div className="faq-wrapper">
        <div className="faq-left">
          <span className="tag">Frequently Asked Question</span>
          <h1>General Asked Questions</h1>
          <hr />
          <h3>Do you still have any question?</h3>
          <p>
            Quick answers to questions you may have. Can't find what you're
            looking for? Get in touch with us.
          </p>
        </div>
        {/* RIGHT SIDE */}
        <div className="faq-right">
          {faqData.map((item, index) => (
            <div
              className={`faq-item ${
                activeIndex === index ? "active" : ""
              }`}
              key={index}
            >
              {/* QUESTION */}
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h4>{item.question}</h4>

                {/* ICON (ROTATION BASED) */}
                <span
                  className={
                    activeIndex === index ? "rotate" : ""
                  }
                >
                  <FaPlus />
                </span>
              </div>

              {/* ANSWER (ALWAYS RENDERED for animation) */}
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;