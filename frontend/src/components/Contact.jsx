import FAQ from "./Faq";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Construct WhatsApp message
    const whatsappNumber = "8279895778"; // Replace with actual number, formatted without spaces
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="contact">
        <h1 className="contact-title">Get In Touch</h1>

        <div className="contact-card">
          {/* Leaf Image */}
          <div className="leaf">
            <RiCustomerService2Line className="image" />
          </div>

          <div className="contact-container">
            {/* Phone */}
            <div className="contact-box">
              <FaPhoneAlt className="icon" />
              <p>+917900302040</p>
              {/* <p>+123 456 7890</p> */}
            </div>

            {/* Email */}
            <div className="contact-box">
              <MdEmail className="icon" />
              <p>infoherboliya@gmail.com</p>
              <p>supportherboliya@gmail.com</p>
            </div>

            {/* Address */}
            <div className="contact-box">
              <FaMapMarkerAlt className="icon" />
              <p>Chandpur Road Shivlock colony</p>
              <p>(up) india</p>
            </div>
          </div>
        </div>
      <FAQ />
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "error" : ""}
              ></textarea>
              {errors.message && (
                <span className="error-text">{errors.message}</span>
              )}
            </div>
            <button type="submit" className="submit-btn">
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
