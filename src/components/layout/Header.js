import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return ( 
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Exos Heroes Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/Characters">Characters</Nav.Link>
            <Nav.Link href="/Mechanincs">Mechanics</Nav.Link>
            <NavDropdown title="Guides" id="collasible-nav-dropdown">
              <NavDropdown.Item>Labyrinth</NavDropdown.Item>
              <NavDropdown.Item>Challenges</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Rerolling</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets" 
              style={{borderRight: "1px solid gray", marginRight:"4px"}}>
                Register
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes" style={{paddingLeft:"4px"}}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment> 
   );
}
 
export default Header;