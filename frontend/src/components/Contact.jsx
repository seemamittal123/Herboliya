import FAQ from "./Faq";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <div className="contact">
        <h1 className="contact-title">Get In Touch</h1>

        <div className="contact-card">
          {/* Leaf Image */}
          <div className="leaf">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2909/2909765.png"
              alt="leaf"
            />
          </div>

          <div className="contact-container">
            {/* Phone */}
            <div className="contact-box">
              <FaPhoneAlt className="icon" />
              <p>+123 456 7890</p>
              <p>+123 456 7890</p>
            </div>

            {/* Email */}
            <div className="contact-box">
              <MdEmail className="icon" />
              <p>info@example.com</p>
              <p>support@example.com</p>
            </div>

            {/* Address */}
            <div className="contact-box">
              <FaMapMarkerAlt className="icon" />
              <p>1569 Ave, New York,</p>
              <p>NY 10028, USA</p>
            </div>
          </div>
        </div>
      </div>
      <FAQ />
    </>
  );
};

export default Contact;
