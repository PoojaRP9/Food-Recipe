import React from "react";
import CustomNavbar from "../Main/CustomNavbar";
import "./Contact.css";
import axios from "axios";

const Contact = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/user/contactme", {
      name: name, email: email, message: message
    }).then(res => {
      alert(res.data.message);
    }).catch(e => console.log(e));
  }

  return (
    <>
      <CustomNavbar />
      <div className="contact-container">
        <h1> Contact Us</h1>
        <div className="contact-title">
          <p>Have a question? Get in touch with us!</p>
        </div>
        <div className="contact-info">
          <div className="contact-name">
            <label htmlfor="my-name">Your Name</label>
            <br />
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
          </div>

          <div className="contact-email">
            <label htmlfor="my-email">Your Email</label> <br />
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
          </div>

          <div className="contact-message">
            <br />
            <label htmlfor="messages">Message</label>
            <br/>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter Message" />
          </div>

          <div className="contact-button">
            <button onClick={handleSubmit}>Send Message</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
