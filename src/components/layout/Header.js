import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Form, InputGroup, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Header = () => {
  
  const [session, setSession] = React.useState(null)
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const logout = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7172/api/user/logout', {}, {withCredentials: true})
      .then((res) => {
        setUsername(null);
        setPassword(null);
        console.log(`logout:`)
        console.log(res.data)
        setSession(null);
      })
  }

  const submitOnEnter = (e) => {
    if(e.keyCode === 13) submit(e)
  }

  const submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7172/api/user', {username, password}, {withCredentials: true})
      .then((res) => {
        console.log(`Login:`)
        console.log(res.data.payload)
        if(res.data.payload) setSession(res.data.payload)
      })
      .catch(err=>{
        console.log(`Error 🐱‍👤 : ${err}`)
      })
  }

  React.useEffect(() => {
    axios.post('http://localhost:7172/api/user/auth',{}, {withCredentials: true})
      .then(res => {
          if(!session) {
            console.log("useEffect on header : ")
            console.log(res.data)
            setSession(res.data)
          }
      })
  }, [session])

  return ( 
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link  className="navbar-brand" to="/">Exos Heroes Hub</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/Characters">Characters</Link>
            <Link className="nav-link" to="/Items">Items</Link>
            <NavDropdown title="Guides" id="collasible-nav-dropdown">
              <Link className="dropdown-item" to="/Labyrinth">Labyrinth</Link>
              <Link className="dropdown-item" to="/Challenges">Challenges</Link>
              <Link className="dropdown-item" to="/Others">Something</Link>
              <NavDropdown.Divider />
              <Link className="dropdown-item" to="/Rerolling">Rerolling</Link>
            </NavDropdown>
            <Link className="nav-link" to="/Register">Register</Link>
          </Nav>
          <Nav>
            {!session ? 
            <Form inline>
              <Form.Row className="align-items-center">
                <Col>
                  <Form.Group controlId="formUsername">
                    <Form.Label srOnly>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>@</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control placeholder="Username here..." onChange={e => setUsername(e.target.value)} onKeyDown={submitOnEnter}/>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formPassord">
                    <Form.Label srOnly>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password here..." onChange={e => setPassword(e.target.value)} onKeyDown={submitOnEnter}/>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Button variant="outline-primary" onClick={submit}>Login</Button>
            </Form>
            :
            
              <NavDropdown alignRight title={`Hi, ${session.username}`} id="collasible-nav-dropdown">
                <Link className="dropdown-item" to={`/Profile/${session.username}`}>Profile</Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment> 
   );
}
 
export default Header;