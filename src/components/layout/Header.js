import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Header = () => {
  return ( 
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link  className="navbar-brand" to="/">Exos Heroes Hub</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/Characters">Characters</Link>
            <Link className="nav-link" to="/Mechanics">Mechanics</Link>
            <Link className="nav-link" to="/Items">Items</Link>
            <NavDropdown title="Guides" id="collasible-nav-dropdown">
              <NavDropdown.Item><Link className="dropdown-item" to="/Labyrinth">Labyrinth</Link></NavDropdown.Item>
              <NavDropdown.Item><Link className="dropdown-item" to="/Challenges">Challenges</Link></NavDropdown.Item>
              <NavDropdown.Item><Link className="dropdown-item" to="/Others">Something</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item><Link className="dropdown-item" to="/Rerolling">Rerolling</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link className="nav-link" to="/Login">Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment> 
   );
}
 
export default Header;