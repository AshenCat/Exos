import React  from 'react';
import {Button, Modal} from 'react-bootstrap'

const RegisterConfirmation = (props) => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( 
    <>
        <Button variant="primary" onClick={handleShow}>
            Submit
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>Login</Modal.Header>
            <Modal.Body>
                {{/*form here*/}}
            </Modal.Body>
            <Modal.Footer>
                Button
            </Modal.Footer>
        </Modal>
    </>
    );
}


 
export default RegisterConfirmation;