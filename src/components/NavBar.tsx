import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <Link to="/">
          <Navbar.Brand>
            <img
              src={`${process.env.PUBLIC_URL}/img/logo.webp`}               
              width="40" // Set the width as needed
              height="40" // Set the height as needed
              className="d-inline-block align-top" // Aligns the image vertically with adjacent text
              alt="CultureArtDiary Logo" // Alternative text for the image
            />
            
          </Navbar.Brand>
        </Link>


        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/user">User</Nav.Link>
            <NavDropdown title="Dropdown" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Disabled Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;