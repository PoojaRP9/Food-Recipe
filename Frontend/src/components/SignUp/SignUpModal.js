import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { BsLock, BsEye, BsEyeSlash, BsPerson, BsCheck } from "react-icons/bs";
import axios from "axios";

const SignUpModal = ({ show, handleClose, onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
  });

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const signUpRequest = new FormData();
    signUpRequest.append("firstName", formData.firstName);
    signUpRequest.append("lastName", formData.lastName);
    signUpRequest.append("email", formData.email);
    signUpRequest.append("username", formData.username);
    signUpRequest.append("password", formData.password);
    signUpRequest.append("profilePicture", formData.profilePhoto);
    axios.post("http://localhost:8080/api/auth/signup", signUpRequest, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      handleClose();
      console.log(res.data);
    }).catch(e => console.log(e));
  };

  const handleModalClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePhoto: "",
    });
    handleClose();
    if (signUpSuccess) {
      onSignUpSuccess();
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="mx-auto">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSignUpSubmit}>
          {/* ... (other form controls) ... */}

          <Form.Group controlId="formFirstName">
            <Form.Label>
              <FaUser className="me-2" />
              First Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>
              <FaUser className="me-2" />
              Last Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>
              <BsPerson className="me-2" />
              Username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>
              <FaEnvelope className="me-2" />
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <BsLock className="me-2" />
              Password
            </Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleTogglePassword}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>
              <BsCheck className="me-2" />
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formProfilePhoto">
            <Form.Label>
              <IoMdImages className="me-2" />
              Profile Photo
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="profilePhoto"
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="d-flex mt-3 justify-content-center">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
