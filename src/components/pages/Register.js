import React from 'react';
import axios from 'axios';
import { Container, Form, Col, Button, Row, InputGroup } from 'react-bootstrap';



const Register = (props) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
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

        if (!validated) return
        e.preventDefault();
        axios.put(`http://localhost:7172/api/user/`, {username, password})
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
            <h1>Register</h1>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Username..." 
                                onChange={ e=> {setUsername(e.target.value); setIsValid(false)}}
                                pattern="[A-Za-z0-9].{8,15}"
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
                            onChange={ e=> setPassword(e.target.password)}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
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
        </Container>
    </> 
    );
}
 
export default Register;