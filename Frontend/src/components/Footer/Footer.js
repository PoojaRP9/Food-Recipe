import React, {useState} from "react";
import "../Footer/Footer.css";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/Images/logo.jpg";
import axios from "axios";


const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscription = (e) => {
    e.preventDefault();
    const config = {
      params: {
        email: email
      }
    }
    console.log(config);
    axios.post("http://localhost:8080/api/user/subscribeonce", {}, config).then(response => {
      alert(response.data.message);
    }).catch(error => console.log(error));
  }

  return (
    <>
      <div className="footer">
        <div className="footer-section">
          <div className="footer-links-div">
            <div className="footer-links">
            <img src={logo} alt="FoodieHUB Logo" className="footer-logo" />
              <p className="info">
                FoodieHub is a place where you can please your soul and tummy
                with delicious food recipes of all cuisine. And our service is
                absolutely free.
              </p>
              <div className="footer-icons">
                <FcGoogle className="google-icon icon-large" />
                <FaFacebookSquare className="facebook-icon icon-large" />
                <AiFillLinkedin className="linkedin-icon icon-large" />
                <BsInstagram className="instagram-icon icon-large" />
              </div>
            </div>

            <div className="footer-links active-link">
              <h5>Quick Links</h5>
              <a href="">Home</a>
              <a href="">Recipe</a>
              <a href="">About</a>
              <a href="">Contact Us</a>
            </div>

            <div className="footer-links contact-us">
              <h5>Contact Us</h5>
              <p className="contact">foodieHub@gmail.com</p>
              <p className="contact">+91-7666470548</p>
            </div>

            <div className="footer-links subscribe">
              <div className="footer-subscribe">
                <h5>Subscribe to get updates about Popular Recipe</h5>
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    placeholder="Your E-mail"
                    className="input-email"
                  />
                  <button onClick={handleSubscription} className="submit">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          <hr className="footer-hr-line" />

          <div className="footer-below">
            <div className="footer-copyright">
              <p>copyright © {year} | All Rights Reserved </p>
            </div>

            <div className="footer-below-links">
              <a href="/">
                <p>Terms and Condition</p>
              </a>
              <a href="/">
                <p>Privacy</p>
              </a>
              <a href="/">
                <p>Cookies</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
