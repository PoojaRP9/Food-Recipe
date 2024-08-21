import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Form,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaUser,
  FaUserCircle,
  FaThumbsUp,
  FaUpload,
  FaSignOutAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Images/logo.jpg";
import "./CustomNavbar.css";

const CustomNavbar = () => {
  const dropdownItemStyle = {
    fontSize: "14px",
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout operations here
    // Example: clear local storage, reset authentication state, etc.
    
    // Redirect to main page
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navbar-custom">
        <Container>
        <Navbar.Brand href="/home">
            <img
              src={logo} 
              alt="FoodieHub Logo"
              height="30"
            />
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <NavLink to="/main" className="nav-link custom-link">
                Home
              </NavLink>
              <NavDropdown title="Language" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="">English</NavDropdown.Item>
                <NavDropdown.Item href="">Hindi</NavDropdown.Item>
                <NavDropdown.Item href="">Marathi</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Recipes" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="">Veg</NavDropdown.Item>
                <NavDropdown.Item href="">Non-Veg</NavDropdown.Item>
                <NavDropdown.Item href="">Vegan</NavDropdown.Item>
                <NavDropdown.Item href="">Gluten</NavDropdown.Item>
                <NavDropdown.Item href="">Dessert</NavDropdown.Item>
                <NavDropdown.Item href="">BreakFast</NavDropdown.Item>
              </NavDropdown>
              <NavLink to="/about" className="nav-link custom-link">
                About
              </NavLink>
              <NavLink to="/contactus" className="nav-link custom-link">
               Contact Us
              </NavLink>
            </Nav>

            <Form className="d-flex ml-auto ms-auto">
              <NavLink to="/searchbar" className="nav-link custom-link">
                {" "}
                <Button
                  variant="outline-success"
                  className="circular-icon me-3"
                >
                  <FaSearch />
                </Button>
              </NavLink>

              <NavLink to="/likes" className="nav-link custom-link">
                <Button variant="outline-danger" className="circular-icon me-3">
                  <FaHeart />
                </Button>
              </NavLink>
              <NavLink to="/uploadrecipe" className="nav-link custom-link">
                <Button
                  variant="outline-info"
                  className="me-3"
                  style={{
                    color: "black",
                    borderColor: "black",
                    border: "none",
                  }}
                >
                  <FaUpload className="me-1" />
                  Upload
                </Button>
              </NavLink>

              <NavDropdown
                title={<FaUser />}
                id="collapsible-nav-dropdown"
                className="profile-dropdown"
                align="end" // Aligns the dropdown menu to the end (right) of the Navbar
              >
                <NavLink
                  to="/profile"
                  className="nav-link custom-link"
                  style={dropdownItemStyle}
                >
                  <NavDropdown.Item href="/profile">
                    <FaUserCircle className="me-2" />
                    My Profile
                  </NavDropdown.Item>
                </NavLink>

                <NavDropdown.Item href="\Likes" style={dropdownItemStyle}>
                  <FaThumbsUp className="me-2" />
                  Liked Recipe
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="\Profile"
                  style={dropdownItemStyle}
                >
                  <FaUpload className="me-2" />
                  Uploaded Recipe
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} style={dropdownItemStyle}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
