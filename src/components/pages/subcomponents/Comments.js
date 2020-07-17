import React from 'react';
import {Container, ListGroup, Row, Form, InputGroup, Button, Card, Col, ButtonGroup} from 'react-bootstrap'
import {UserContext} from '../../../App';
import target from '../../helper/target'
import axios from 'axios';

const Comments = (props) => {
    // React.useEffect(()=>{
    //     axios.get()
    // })

    const user = React.useContext(UserContext);

    // const allComments = [{
    //     _id: 0,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     user: "admin",
    //     message: "Wow.jpeg",
    //     points: 24,
    //     character: props.character,
    //     childOf: null
    // }, {
    //     _id: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     user: "Loser",
    //     message: "I'm a Simp",
    //     points: 35,
    //     character: props.character,
    //     childOf: 2
    // }, {
    //     _id: 2,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     user: "Igor",
    //     message: "I'm a living meme",
    //     points: 999,
    //     character: props.character,
    //     childOf: null
    // }
    // ]

    // const [subComments, setSubComments] = React.useState([])
    const [comments, setComments] = React.useState([])

    const submitComment = (formId) => {
        console.log(`-------------------------`)
        const message = document.getElementById(formId).value;
        if(message.length > 0){
            if(formId === "newComment"){
                // console.log("made a comment")
                // setComments([...comments, {
                //     _id: Math.random(),
                //     user,
                //     message,
                //     points: 0,
                //     // expecting id of character
                //     character: props.character,
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // }])
                // setTimeout(()=>{
                //     console.log(comments)
                // },2000)
                // console.log(comments)
                axios.put(`${target}/api/comment/character/${props.character}`, {
                    message,
                    character: props.character,
                    childOf: null
                }, {withCredentials: true}).then(res=>{
                    // console.log(res.data)
                    fetchComments();
                    document.getElementById(formId).value="";
                })
            }
            else {
                // console.log(formId)
                // console.log(formId.replace('reply@', ''))
                // setSubComments([...subComments, {
                //     _id: Math.random(),
                //     user,
                //     message,
                //     points: 0,
                //     // only for dummy data
                //     // childOf: parseInt(formId.replace('reply@', '')),
                //     childOf: formId.replace('reply@', ''),
                //     // expecting id of character
                //     character: props.character,
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // }])
                // setTimeout(()=>{
                //     console.log(subComments)
                // },2000)
                axios.put(`${target}/api/comment/character/${props.character}`, {
                    message,
                    character: props.character,
                    childOf: formId.replace('reply@', '')
                }, {withCredentials: true}).then(res=>{
                    // console.log(res.data)
                    fetchComments();
                    document.getElementById(formId).value = ""
                })
            }
        }
    }

    const fetchComments = () => {
        axios.get(`${target}/api/comment/character/${props.character}`).then(res => {
            console.log(res.data.payload)
            if (res.data.payload !== null) {
                setComments(res.data.payload.sort((a, b) => {
                    if (a.createdAt > b.createdAt) return -1;
                    else return 1;
                }))
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    const voteComment = (vote, id) => {
        axios.patch(`${target}/api/comment/vote/${id}`, {vote}, {withCredentials: true}).then(res=>{
            console.log(res.data)
            fetchComments();
        })
    }
    
    React.useEffect(()=>{
        // console.log('aw')
        fetchComments();
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
                                <Form className="mb-4">
                                    <Form.Row>
                                        <Col sm={2}><Form.Label className="mb-0" htmlFor="username">Username: </Form.Label></Col>
                                        <Col md={4} sm={6}>
                                            <InputGroup>
                                                <InputGroup.Prepend className="ml-3" >
                                                  <InputGroup.Text>@</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control 
                                                    id="username" 
                                                    aria-describedby="usernameHelpInline" 
                                                    defaultValue={user ? user.username : ""}
                                                    readOnly />
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
                                        <Button variant="outline-secondary" onClick={()=>submitComment("newComment")}>Post</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text muted>You must be logged in to leave a comment</Form.Text>
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
                                                    {comment.createdAt.toString() === comment.updatedAt.toString() ? 
                                                    null : <small><Row>Last updated: {comment.updatedAt.toLocaleString()}</Row></small>}
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col sm={2} className="ml-auto ml-3">
                                            <Row className="flex-row-reverse">
                                                <ButtonGroup vertical className="width-100">
                                                    <Button variant="outline-secondary" className="width-100 u" onClick={()=>voteComment("up", comment._id)}>+</Button>
                                                    <Button variant="info" onClick={fetchComments}>{comment.points}</Button>
                                                    <Button variant="outline-warning" className="width-100 d" onClick={()=>voteComment("down", comment._id)}>-</Button>
                                                </ButtonGroup>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {/* {user ? comment.user === user.username ? 
                                        <InputGroup className="mt-3 pre-wrap-me">
                                            <Form.Control value={comment.message} id={`edit@${comment._id}`}/>
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary"></Button>
                                            </InputGroup.Append>
                                        </InputGroup> : 
                                        <div className="mt-3 pre-wrap-me">{comment.message}</div> : <div className="mt-3 pre-wrap-me">{comment.message}</div>} */}
                                        <div className="mt-3 pre-wrap-me mb-3">{comment.message}</div>
                                    </Row>
                                    <Row className="mt-2 mb-2 flex-row-reverse">
                                        <div></div>
                                        {/* {user ? comment.user === user.username ? <Button variant="outline-info">Edit</Button> : null : null} */}
                                        {user ? user.access === "admin" ? <Button variant="danger" size="sm">Delete</Button> : null : null}
                                    </Row>
                                    <Row>
                                        <ListGroup className="width2-100">
                                            {comment.subComments ? comment.subComments.map((subComment) => {
                                            return  <ListGroup.Item key={subComment._id} className="width2-100">
                                                        <Row className="pl-3">
                                                            <div><img src={require("../img/Avatar1.png")} width="75px" height="75px" alt="user avatar" className="pr-2"/></div>
                                                            <div className="ml-4 mt-2">
                                                                <Row><h6 className="mr-1" style={{"marginBottom":"0px", "display":"inline", "lineHeight":"1.5"}}>{subComment.user}</h6> replied:</Row>
                                                                <Row><small>{`Posted: ${subComment.createdAt.toLocaleString()}`}</small></Row>
                                                            </div>
                                                        </Row>
                                                        <Row className="pl-3 mb-2"><div className="mt-3 pre-wrap-me">{subComment.message}</div></Row>
                                                    </ListGroup.Item>
                                            }) : null}
                                            {/* Since comment._id is unique, I'll name each form's id with it */}
                                            <InputGroup>
                                                <Form.Control 
                                                    as="textarea" 
                                                    id={`reply@${comment._id}`} 
                                                    rows="3" 
                                                    placeholder="Reply to this comment..."/>
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" onClick={()=>submitComment(`reply@${comment._id}`)}>Reply</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
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