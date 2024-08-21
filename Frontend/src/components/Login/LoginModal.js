import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert, Col, Row } from "react-bootstrap";
import { BsLock, BsEye, BsEyeSlash, BsPerson } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa"; // Import Google icon
import SignUpModal from "../SignUp/SignUpModal";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import ForgotPasswordModal
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginModal = ({ show, handleClose }) => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const initialFormData = {
    username: "",
    password: "",
  };

  useEffect(() => {
    // Reset form data when the modal is closed
    if (!show) {
      setFormData(initialFormData);
    }
  }, [show]);

  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [forgotPasswordModalShow, setForgotPasswordModalShow] = useState(false); // New state for Forgot Password modal

  const handleInputChange = (e) => {
    setValidationError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setValidationError("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username: formData.username,
        password: formData.password
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);
      // Handle successful login
      navigate("/Main"); // Navigate to the Main page
    } catch (error) {
      console.error('Error:', error);
      setValidationError("Invalid username or password"); // Set validation error message
    }
  };

  const handleModalClose = () => {
    setFormData(initialFormData);
    handleClose();
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignUp = () => {
    setSignUpModalShow(true);
  };

  const handleSignInWithGoogle = () => {
    // Render Google Sign-In button using provided HTML and JavaScript code
    const googleSignInScript = document.createElement('script');
    googleSignInScript.src = "https://apis.google.com/js/platform.js?onload=renderButton";
    googleSignInScript.async = true;
    googleSignInScript.defer = true;
    document.body.appendChild(googleSignInScript);
  };

  const handleForgotPassword = () => {
    setForgotPasswordModalShow(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="mx-auto">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginFormSubmit}>
            {/* Username Field */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <BsPerson className="me-2" />
                UserName
              </Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                name="username"
                value={formData.username} // Bind value to form data
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Password Field */}
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
                  value={formData.password} // Bind value to form data
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

            {/* Validation Error Message */}
            {validationError && (
              <Alert variant="danger">{validationError}</Alert>
            )}

            {/* Submit Button */}
            <div className="d-flex mt-2 justify-content-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>

            {/* Sign Up Link */}
            <Row className="mt-3">
              <Col>
                <p className="text-center">
                  Don't have an account?{" "}
                  <Button variant="link" onClick={handleSignUp}>
                    Sign Up
                  </Button>
                </p>
              </Col>
            </Row>

            {/* Forgot Password Link */}
            <Row className="mt-3">
              <Col>
                <p className="text-center">
                  <Button variant="link" onClick={handleForgotPassword}>
                    Forgot Password?
                  </Button>
                </p>
              </Col>
            </Row>

            {/* Sign in with Google Button */}
            <div className="d-flex  justify-content-center">
              <Button variant="secondary" onClick={handleSignInWithGoogle}>
                <FaGoogle className="me-2" />
                Sign in with Google
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {signUpModalShow && (
        <SignUpModal
          show={true}
          handleClose={() => setSignUpModalShow(false)}
        />
      )}
      {forgotPasswordModalShow && (
        <ForgotPasswordModal
          show={true}
          handleClose={() => setForgotPasswordModalShow(false)}
        />
      )}
    </>
  );
};

export default LoginModal;
