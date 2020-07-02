import React from 'react';
import axios from 'axios';
import { Container, Form, Col, Button, Row, InputGroup } from 'react-bootstrap';



const Register = (props) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);

    

    const onSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:7172/api/user/`, {username, password})
            .then((res) => {
                console.log("Saving to the database...");
                console.log(`User: ${username}\nPassword: ${password}\nEmail: ${email}`);
            });
    }

    const usernameCheck = () => {
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
            <Form >
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" placeholder="Enter Username..." onChange={ e=> {setUsername(e.target.value); setIsValid(false)}}/>
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={usernameCheck}>Check</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            Username Availability: {isValid ? 'Available' : 'Not Available'}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password..." onChange={ e=> setPassword(e.target.password)} min="8"/>
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
                    <Button className="m-4" onSubmit={onSubmit}>Submit</Button>
                </Row>
            </Form>
        </Container>
    </> 
    );
}
 
export default Register;