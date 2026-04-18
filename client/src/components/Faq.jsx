import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const faqData = [
  {
    question: "How do I enroll in a course?",
    answer:
      "New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried."
  },
  {
    question: "Can I access my courses on mobile devices?",
    answer:
      "Yes, our platform is fully responsive and works across all mobile, tablet, and desktop devices."
  },
  {
    question: "What benefits does online education offer?",
    answer:
      "Online education provides flexibility, accessibility, and a wide range of learning resources from anywhere in the world."
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

        {/* LEFT SIDE */}
        <div className="faq-left">
          <span className="tag">Frequently Asked Question</span>
          <h1>General Asked Questions</h1>

          <hr />

          <h3>Do you still have any question?</h3>
          <p>
            Quick answers to questions you may have. Can't find what you're
            looking for? Get in touch with us.
          </p>

          <button>Contact Us</button>
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