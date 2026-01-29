import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/NavBar.css';

// Component thanh điều hướng responsive với Bootstrap
function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        {/* Brand/Logo điều hướng về trang chủ */}
        <Navbar.Brand as={Link} to="/">FER Exercises</Navbar.Brand>
        {/* Nút hamburger menu cho mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Menu có thể thu gọn */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Các link điều hướng đến từng bài tập */}
            <Nav.Link as={Link} to="/exercise1">Exercise 1</Nav.Link>
            <Nav.Link as={Link} to="/exercise2">Exercise 2</Nav.Link>
            <Nav.Link as={Link} to="/exercise3">Exercise 3</Nav.Link>
            <Nav.Link as={Link} to="/exercise4">Exercise 4</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
