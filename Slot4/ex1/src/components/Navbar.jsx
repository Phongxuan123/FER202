import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar.css";

function NavbarComponent() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          Pizza House
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto navbar-menu">
            <Nav.Link as={Link} to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Nav.Link>
          </Nav>

          <Form className="d-flex search-form">
            <FormControl
              type="search"
              placeholder="Search"
              className="search-input"
            />
            <Button type="submit" className="search-btn">
              🔍
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;