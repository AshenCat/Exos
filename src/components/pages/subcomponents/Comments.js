import React from 'react';
import {Container, ListGroup, Row, Form, InputGroup, Button, Card, Col, ButtonGroup} from 'react-bootstrap'
import {UserContext} from '../../../App';
// import axios from 'axios';

const Comments = (props) => {
    // React.useEffect(()=>{
    //     axios.get()
    // })

    const user = React.useContext(UserContext);

    const allComments = [{
        _id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: "admin",
        message: "Wow.jpeg",
        character: props.character,
        childOf: null
    }, {
        _id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: "Loser",
        message: "I'm a Simp",
        character: props.character,
        childOf: 2
    }, {
        _id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: "Igor",
        message: "I'm a living meme",
        character: props.character,
        childOf: null
    }
    ]

    const [subComments, setSubComments] = React.useState([])
    const [comments, setComments] = React.useState([])
    const [childOf, setChildOf] = React.useState(null)

    const submitComment = () => {
        console.log(comments)
        const message = document.getElementById("newComment").value;
        const user = document.getElementById("username").value;
        if(message.length > 0 && user.length > 6){
            if(!childOf){
                console.log("made a comment")
                setComments([...comments, {
                    _id: Math.random(),
                    user,
                    message,
                    // expecting id of character
                    character: props.character,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }])
            }
            else if(childOf){
                console.log("replied")
                setSubComments([...subComments, {
                    _id: Math.random(),
                    user,
                    message,
                    childOf: childOf ? childOf._id : null,
                    // expecting id of character
                    character: props.character,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }])
            }
            console.log(comments)
            setChildOf(null)
        }
    }

    const onReply = (comment) => {
        // setChildOf
        setChildOf(comment)
    }
    
    React.useEffect(()=>{
        // console.log('aw')
        setComments(allComments.filter((comment) => comment.childOf === null))
        setSubComments(allComments.filter((comment) => comment.childOf !== null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ( 
        <>
            <h3 className="mt-4">{comments === [] ? "0 Comments" : comments.length !== 1? `${comments.length} Comments` : "1 Comment"} :</h3>
            <Container className="mb-4">
                <Row>
                    <Container>
                        <Card>
                            <Card.Header>Write a comment</Card.Header>
                            <Card.Body>
                                <Form.Text muted>Temporary username input till SSL</Form.Text>
                                <Form className="mb-4">
                                    <Form.Row>
                                        <Col sm={2}><Form.Label htmlFor="username">Username: </Form.Label></Col>
                                        <Col md={4} sm={6}>
                                            <InputGroup>
                                                <InputGroup.Prepend className="ml-3" >
                                                  <InputGroup.Text>@</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control 
                                                    id="username" 
                                                    aria-describedby="usernameHelpInline" 
                                                    defaultValue={user !== null ? user.username : ""}
                                                    readOnly={user} />
                                            </InputGroup>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className="mt-1">
                                        <Col sm={2}><Form.Label htmlFor="username">To: </Form.Label></Col>
                                        <Col md={4} sm={6}>
                                            <InputGroup>
                                                <InputGroup.Prepend className="ml-3" >
                                                  <InputGroup.Text>@</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control 
                                                    id="reply" 
                                                    defaultValue={childOf ? `${childOf.user}@${childOf._id}` : ""}
                                                    readOnly/>
                                                <InputGroup.Append>
                                                    <Button variant="outline-warning" onClick={()=>setChildOf(null)}>Clear</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                    </Form.Row>
                                </Form>
                                <InputGroup>
                                    <Form.Control 
                                        as="textarea" 
                                        id="newComment" 
                                        rows="3" 
                                        placeholder="Write a comment..."/>
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={()=>submitComment()}>Post</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </Container>
                </Row>
                <ListGroup>
                    {comments !== [] ? comments.map((comment, ctr) => { 
                    return <ListGroup.Item key={comment._id}>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <div><img src={require("../img/Avatar1.png")} width="75px" height="75px" alt="user avatar" className="pr-2"/></div>
                                                    <div className="ml-4 mt-2">
                                                        <Row><h6 className="mr-1" style={{"marginBottom":"0px", "display":"inline", "lineHeight":"1.5"}}>{comment.user}</h6></Row>
                                                        <Row><small>{`Posted: ${comment.createdAt.toLocaleString()}`}</small></Row>
                                                        {comment.createdAt.toString() === comment.updatedAt ? 
                                                        null : <small><Row>Last updated: {comment.updatedAt.toLocaleString()}</Row></small>}
                                                    </div>
                                                </Row>
                                            </Col>
                                            <Col sm={1}>
                                                <ButtonGroup vertical className="width-100">
                                                    <Button variant="outline-secondary" className="width-100 u">+</Button>
                                                    <Button variant="outline-warning" className="width-100 d">-</Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="mt-3 pre-wrap-me">{comment.message}</div>
                                        </Row>
                                        <Row className="mt-2 mb-2 flex-row-reverse">
                                            <div></div><Button size="sm" variant="outline-secondary" onClick={()=>onReply(comment)}>Reply</Button>
                                        </Row>
                                        <Row>
                                            <ListGroup className="width2-100">
                                                {subComments.map((subComment) => {
                                                if(subComment.childOf !== comment._id) return null
                                                else return <ListGroup.Item key={subComment._id} className="width2-100">
                                                        <Row>
                                                            <div><img src={require("../img/Avatar1.png")} width="75px" height="75px" alt="user avatar" className="pr-2"/></div>
                                                            <div className="ml-4 mt-2">
                                                                <Row><h6 className="mr-1" style={{"marginBottom":"0px", "display":"inline", "lineHeight":"1.5"}}>{subComment.user}</h6> replied:</Row>
                                                                <Row><small>{`Posted: ${subComment.createdAt.toLocaleString()}`}</small></Row>
                                                                {subComment.createdAt.toString() === subComment.updatedAt ? 
                                                                null : <small><Row>Updated: {subComment.updatedAt.toLocaleString()}</Row></small>}
                                                            </div>
                                                        </Row>
                                                        <Row><div className="mt-3 pre-wrap-me">{subComment.message}</div></Row>
                                                    </ListGroup.Item>
                                                })}
                                            </ListGroup>
                                        </Row>
                                    </Container>
                                </ListGroup.Item>
                  }) : <div></div>}
                </ListGroup>
            </Container> 
            {/* <Modal>
                <Modal.Header>Request Can't Be Performed...</Modal.Header>
                <Modal.Body>You must be logged in inorder to comment</Modal.Body>
            </Modal> */}
        </> 
    );
}
 
export default Comments;