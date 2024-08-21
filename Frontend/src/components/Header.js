import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { BsFillUnlockFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import './navbarStyles.css';
import HomeSection from "./HomeSection";
import LoginModal from "./Login/LoginModal";
import logo from "../assets/Images/logo.jpg";


const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginModalShow = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navbar-custom">
        <Container>
          
             <Navbar.Brand href="/">
            <img
              src={logo}
              alt="FoodieHub Logo"
              style={{ height: "auto", maxHeight: "30px" }} 
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto ms-auto">
              <Nav.Link href="/Home" className="me-2">Home</Nav.Link>
              <NavDropdown title="Language" id="collapsible-nav-dropdown" className="me-2">
                <NavDropdown.Item href="">English</NavDropdown.Item>
                <NavDropdown.Item href="">Hindi</NavDropdown.Item>
                <NavDropdown.Item href="">Marathi</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Recipes" id="collapsible-nav-dropdown" className="me-2">
                <NavDropdown.Item href="/veg">Veg</NavDropdown.Item>
                <NavDropdown.Item href="#nonveg">Non-Veg</NavDropdown.Item>
                <NavDropdown.Item href="#vegan">Vegan</NavDropdown.Item>
                <NavDropdown.Item href="#gluten">Gluten</NavDropdown.Item>
                <NavDropdown.Item href="#gluten">Dessert</NavDropdown.Item>
                <NavDropdown.Item href="#gluten">Breakfast</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link to="/" className="nav-link me-2">
                About
              </Nav.Link>
              <Nav.Link to="/">Contact Us</Nav.Link>
            </Nav>

            <Button
              variant="secondary"
              onClick={handleLoginModalShow}
              className="d-flex align-items-center"
              style={{ marginRight: "30px" }}
            >
              <BsFillUnlockFill className="me-2" /> Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <HomeSection />
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
    </div>
  );
};

export default Header;
