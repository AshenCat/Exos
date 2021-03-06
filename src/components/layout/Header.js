import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Form, InputGroup, Col, Button, Spinner } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DarkModeToggle from '../helper/DarkModeToggle';
import target from '../helper/target';

const Header = (props) => {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const logout = (e) => {
    e.preventDefault();
    axios.post(`${target}/api/user/logout`, {}, {withCredentials: true})
      .then((res) => {
        setUsername("");
        setPassword("");
        // console.log(`logout:`)
        // console.log(res.data)
        props.setSession(null);
      })
  }

  const submitOnEnter = (e) => {
    if(e.keyCode === 13) submit(e)
  }

  const submit = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    axios.post(`${target}/api/user`, {username, password}, {withCredentials: true})
      .then((res) => {
        // console.log(`Login:`)
        console.log(res.data.payload)
        if(res.data.payload) //setTimeout(() => {
          // console.log(res.data.payload)
          props.setSession(res.data.payload)
        //}, 500)
      })
      .catch(err=>{
        console.log(`Error 🐱‍👤 : ${err}`)
        
      })
      setTimeout(() => {
        setIsSubmitting(false)
      }, 500)
  }

  // React.useEffect(() => {
  //   axios.post('http://localhost:7172/api/user/auth',{}, {withCredentials: true})
  //     .then(res => {
  //         if(!props.session) {
  //           console.log("useEffect on header : ")
  //           console.log(res.data)
  //           props.setSession(res.data)
  //         }
  //     })
  // }, [props.session])

  return ( 
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link  className="navbar-brand" to="/">Exos Hub</Link>
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
            {!props.session ? <Link className="nav-link" to="/Register">Register</Link> : null}
            <DarkModeToggle />
          </Nav>
          <Nav>
            {!props.session ? 
            <Form inline>
              <Form.Row className="align-items-center">
                <Col>
                  <Form.Group controlId="formUsername">
                    <Form.Label srOnly>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>@</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control 
                      disabled={isSubmitting} 
                      placeholder="Username here..." 
                      onChange={e => setUsername(e.target.value)} 
                      onKeyDown={submitOnEnter}/>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formPassord">
                    <Form.Label srOnly>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Password here..." 
                      disabled={isSubmitting} 
                      onChange={e => setPassword(e.target.value)} 
                      onKeyDown={submitOnEnter}/>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Button variant="outline-primary" onClick={submit}>
                {isSubmitting ? 
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner> : "Login"}
                </Button>
            </Form>
            :
            
              <NavDropdown alignRight title={`Hi, ${props.session.username}`} id="collasible-nav-dropdown">
                <Link className="dropdown-item" to={`/Profile/${props.session.username}`}>Profile</Link>
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