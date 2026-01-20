import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Navbar.css';

function NavbarComponent() {
  return (
    <Navbar className="navbar-custom">
      <Navbar.Brand href="#" className="navbar-brand">Pizza House</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto navbar-menu">
          <Nav.Link href="#" active>
            Home
          </Nav.Link>
          <Nav.Link href="#">About us</Nav.Link>
          <Nav.Link href="#">Contact</Nav.Link>
        </Nav>
        <Form className="Search d-flex" role="search">
          <FormControl 
          type="search" 
          placeholder="Search"
          className="search-input"/>
          <Button variant="danger" type="submit" className="search-btn">
            🔍
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
