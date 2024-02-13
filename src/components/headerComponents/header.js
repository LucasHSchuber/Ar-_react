import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

//import css
import '../../assets/css/header.css';
import logo from '../../assets/images/mountain.png';


//header
function Header() {

  const [expanded, setExpanded] = useState(false);


  return (
    <Navbar expanded={expanded} className='header' expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Arå <img className="logo-img" src={logo} alt="logo img" ></img></Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/home" className='header-link' >
              Arå
            </Nav.Link>
            <Nav.Link as={Link} to="/stock" className='header-link' >
              Köket
            </Nav.Link>
            <Nav.Link as={Link} to="/additem" className='header-link'>
              Lägg till vara
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
