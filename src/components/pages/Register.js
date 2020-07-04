import React from 'react';
import axios from 'axios';
import { Container, Form, Col, Button, Row, InputGroup, Modal, Card } from 'react-bootstrap';



const Register = (props) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [show, setShow] = React.useState(false);

    //for username availability check
    const [isValid, setIsValid] = React.useState(false);
    //each form validation
    const [validated, setValidated] = React.useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.stopPropagation();
        }
    
        setValidated(true);

        if (!validated || !isValid || username.includes(' ') || password.includes(' ')) {setShow(true); console.log("not valid yo")}
        else 
        axios.put(`http://localhost:7172/api/user/`, {username, password, email:""})
            .then((res) => {
                console.log("Saving to the database...");
                console.log(`User: ${username}\nPassword: ${password}\nEmail: ${email}`);
            });
    }

    const usernameCheck = () => {
        if (username.length < 7) return;
        axios.get(`http://localhost:7172/api/user/${username}`)
            .then((res)=>{
                console.log("Checking if user is valid...");
                console.log(res.data);
                if (res.data.payload === null) {
                    setIsValid(true)
                }
        });
    }

    return ( 
    <>
        <Container>
            <h1 className="mt-4">Register</h1>
            <Row>
                <Col md={9}>
                    <Form noValidate validated={validated} onSubmit={onSubmit} className="mt-4">
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Username</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Username..." 
                                        onChange={ e=> {setUsername(e.target.value); setIsValid(false)}}
                                        pattern="[A-Za-z0-9]{6,16}"
                                        required/>
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={usernameCheck}>Check</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Username Availability: <span className={isValid? "green":"red"}>{isValid ? 'Available' : 'Not Available'}</span>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter Password..." 
                                    onChange={ e=> setPassword(e.target.value)}
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}" 
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email..." onChange={ e=> setEmail(e.target.value)} disabled/>
                                <Form.Text className="text-muted">
                                    Currently disabled
                                </Form.Text>
                            </Col>
                        </Form.Row>
                        <Row>
                            <Button className="m-4" type="submit">Submit</Button>
                        </Row>
                    </Form>
                </Col>
                <Col>
                    {/* eslint-disable-next-line jsx-a11y/heading-has-content*/}
                    <Card>
                        <Card.Header>
                            <h3>Guidelines</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Container>
                                    Username:
                                    <ul>
                                        <li>6-16 characters</li>
                                        <li>No symbols </li>
                                        <li>No special characters</li>
                                        <li>No spaces</li>
                                        <li>Must be validated by clicking the 'Check'</li>
                                    </ul>
                                </Container>
                            </Row>
                            <Row>
                                <Container>
                                    Password:
                                    <ul>
                                        <li>8-20 characters</li>
                                        <li>1 Uppercase letter</li>
                                        <li>1 Number</li>
                                        <li>No spaces</li>
                                    </ul>
                                </Container>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="red">Error</Modal.Title>
                </Modal.Header>
                <Modal.Body className="red">
                    Validation Failed: Check if the entered data passed the validation check...
                </Modal.Body>
            </Modal>
        </Container>
    </> 
    );
}
 
export default Register;