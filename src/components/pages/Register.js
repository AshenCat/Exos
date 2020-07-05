import React from 'react';
import axios from 'axios';
import { Container, Form, Col, Button, Row, InputGroup, Modal, Card, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';



const Register = (props) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    //warning modal
    const [show, setShow] = React.useState(false);
    //success modal
    const [showSuccess, setShowSuccess] = React.useState(false);

    //for username availability check
    const [isValid, setIsValid] = React.useState(false);
    //each form validation
    const [validated, setValidated] = React.useState(false)
    //spinner
    const [response, setResponse] = React.useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (form.checkValidity() === false || !isValid || checkForWhiteSpace(username) || checkForWhiteSpace(password)) {
            e.stopPropagation();
            setShow(true); 
            return
          }
        else setValidated(true);
        setShowSuccess(true)
        console.log(email)
        axios.put(`http://localhost:7172/api/user/`, {username, password})
            .then((res) => {
                console.log(res.data)
                if(res.data.payload.username !== null) {
                    setTimeout(()=>{
                        setResponse(true);
                        console.log("Saving to the database...");
                        console.log(`User: ${res.data.payload.username}\nEmail: ${res.data.payload.email}`);
                    }, 1000)
                }
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

    const LoadingSpinner = () => {
        return !response ?
            <Container>
                <Row>
                <Spinner animation="border" className="force-center">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </Row>
                <Row className="text-center">
                    <p className="text-center">This should not take more than 45 seconds</p>
                </Row>
            </Container>
        :
        <div className="text-center">
            <p>Successfully created account with username : {username}</p>
            <Button onClick={e=>props.history.push('/')}>Move to Home</Button>
        </div>
    }
    const checkForWhiteSpace = (string) => {
        return !(string.length === string.replace(/\s+/g, '').length)
    }

    return ( 
    <>
        <Container>
            <h1 className="mt-4">Register</h1>
            <Row>
                <Col md={9}>
                    <Form noValidate validated={validated} onSubmit={onSubmit} className="mt-4">
                        <Form.Row>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Username</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Username..." 
                                        onChange={ e=> {setUsername(e.target.value); setIsValid(false);}}
                                        pattern="[A-Za-z0-9]{6,16}"
                                        required/>
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={usernameCheck}>Check</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Username Availability: <span className={isValid? "green":"red"}>{isValid ? 'Available' : 'Not Available'}</span>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter Password..." 
                                    onChange={ e=> {setPassword(e.target.value);}}
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}" 
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email..." onChange={ e=> {setEmail(e.target.value);}} disabled/>
                                <Form.Text className="text-muted">
                                    Currently disabled
                                </Form.Text>
                            </Col>
                        </Form.Row>
                        <Row>
                            <Button variant={validated? "primary" : "warning"} className="m-4" type="submit">{validated? 'Submit' : 'Validate'}</Button>
                        </Row>
                    </Form>
                </Col>
                <Col>
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
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Validation Failed:</h5>
                    <ul>
                        <li><span className={validated? "green":"red"}>Passed form requirement: {validated ? "Yes" : "No"}</span></li>
                        <li><span className={isValid? "green":"red"}>Username is valid: {isValid ? "Yes" : "No"}</span></li>
                        <li>
                            <span className={!checkForWhiteSpace(username)? "green":"red"}>
                                Space on username: {checkForWhiteSpace(username) ? "Please remove spaces" : "No"}
                            </span>
                        </li>
                        <li>
                            <span className={!checkForWhiteSpace(password)? "green":"red"}>
                                Space on password: {checkForWhiteSpace(password) ? "Please remove spaces" : "No"}
                            </span>
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
            <Modal show={showSuccess} onHide={()=>setShowSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{response ? "Account successfully created" : "Loading"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoadingSpinner />
                </Modal.Body>
            </Modal>
        </Container>
    </> 
    );
}
 
export default withRouter(Register);