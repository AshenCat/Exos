import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Card, Accordion, Button, Container, Col, Row, ListGroup, Spinner } from 'react-bootstrap';

class ViewCharacter extends Component {
    componentDidMount(){
        console.log(this.props)
        let name = this.props.match.params.name;
        this.setState({name})
    }

    state = { 
        name: null,
        character: {}
    }
    
    displayCharacter = () => {
        const character = this.props.character;
        return(
            <Container className="mt-4">
              <Row className="flex-row-reverse">
                <div></div><Button className="mr-4 mb-3" size="lg" variant="outline-secondary">Back</Button>
              </Row>
              <Row>
                <Col sm={3} style={{}}>
                  <h2 className="text-center">{character.name}</h2>
                  <h4 className="text-center">{character.role}</h4>
                  <div className="text-center">
                    <img className="force-center m-2 img-frame" src={require("../../img/" + character.tier + "/" + character.name + ".JPG")} alt={`${character.name}`}/>
                  </div>
                </Col>
                <Col>
                
                <Row>
                  <Accordion defaultActiveKey="0" style={{"width": "100%"}}>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Skills
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <div className="pre-wrap-me"><b>[Passive] {character.skills.passive.name}</b></div>
                            {character.skills.passive.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>{skill + "\n\n"}</div>
                            })}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <div className="pre-wrap-me"><b>[Active 1] {character.skills.active1.name} - Cost: {character.skills.active1.cost}</b></div>
                            {character.skills.active1.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>{skill + "\n\n"}</div>
                            })}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <div className="pre-wrap-me"><b>[Active 2] {character.skills.active2.name} - Cost: {character.skills.active2.cost}</b></div>
                            {character.skills.active2.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>{skill + "\n\n"}</div>
                            })}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Backstory
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body className="pre-wrap-me">{character.description}</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        Other info
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body className="text-center">
                        {/*
                        name: "Garff",
                        role: "Paladin",
                        sex: "Male",
                        nation: "Saint West",
                        tier: "Fated",
                        element: "Light",
                        age: "55",
                        race: "Dwarf",
                        position: "Defense",
                        type: "Physical",
                        */}
                        <Row>
                          <Col md={6}>Role: &nbsp;&nbsp;&nbsp;&nbsp;{character.role}</Col>
                          <Col md={6}>Sex: &nbsp;&nbsp;&nbsp;&nbsp;{character.sex}</Col>
                        </Row>
                        <Row>
                          <Col md={6}>Nation: &nbsp;&nbsp;&nbsp;&nbsp;{character.nation}</Col>
                          <Col md={6}>Age: &nbsp;&nbsp;&nbsp;&nbsp;{character.age}</Col>
                        </Row>
                        <Row>
                          <Col md={6}>Race: &nbsp;&nbsp;&nbsp;&nbsp;{character.race}</Col>
                          <Col md={6}>Position: &nbsp;&nbsp;&nbsp;&nbsp;{character.position}</Col>
                        </Row>
                        <Row>
                          <Col md>Type: &nbsp;&nbsp;&nbsp;&nbsp;{character.type}</Col>
                          <Col md>Title: &nbsp;&nbsp;&nbsp;&nbsp;{character.title}</Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="4">
                        Stats
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        {/* maxStats: [{
                              level: 100,
                              power: 282000,
                              HP: 6816,
                              attack: 809,
                              minAttack: 742,
                              maxAttack: 877,
                              defense: 1540,
                              hit: 100,
                              dodge: 99,
                              criticalHit: 120,
                              block: 210,
                              attackSpeed: 56,
                              criticalDamage: 150,
                              blockDefenceRate: 50,
                              luck: 0
                            }]*/}
                            <ListGroup>
                              {character.maxStats.map((stats, count) => {
                                return (
                                <ListGroup.Item key={count}>
                                  <h5>Level: {stats.level}</h5>
                                  <hr />
                                  <Row>
                                    <Col md={6}>Power: &nbsp;&nbsp;&nbsp;&nbsp;{stats.power}</Col>
                                    <Col md={6}>HP: &nbsp;&nbsp;&nbsp;&nbsp;{stats.HP}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Attack: &nbsp;&nbsp;&nbsp;&nbsp;{stats.attack}</Col>
                                    <Col md={6}>Defense: &nbsp;&nbsp;&nbsp;&nbsp;{stats.defense}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Hit: &nbsp;&nbsp;&nbsp;&nbsp;{stats.hit}</Col>
                                    <Col md={6}>Dodge: &nbsp;&nbsp;&nbsp;&nbsp;{stats.dodge}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Critical Hit: &nbsp;&nbsp;&nbsp;&nbsp;{stats.criticalHit}</Col>
                                    <Col md={6}>Block: &nbsp;&nbsp;&nbsp;&nbsp;{stats.block}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Attack Speed: &nbsp;&nbsp;&nbsp;&nbsp;{stats.attackSpeed}</Col>
                                    <Col md={6}>Critical Damage: &nbsp;&nbsp;&nbsp;&nbsp;{stats.criticalDamage}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Block Defense Rate: &nbsp;&nbsp;&nbsp;&nbsp;{stats.blockDefenceRate}</Col>
                                    <Col md={6}>Luck: &nbsp;&nbsp;&nbsp;&nbsp;{stats.luck}</Col>
                                  </Row>
                                </ListGroup.Item>
                                )
                              })}
                            </ListGroup>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                </Row>
                </Col>
              </Row>
              {/* Recommendations maybe here */}
              <Row>
              {/* comments: [{
                    user: "TOP KEK",
                    comment: "kekkers bruh...",
                    timestamp: Date.now(),
                    patch: "Zeon"
                }] */}
                {/* <h3 className="mt-4">{character.comments === [] ? "0 Comments" : character.comments.length !== 1? `${character.comments.length} Comments` : "1 Comment"} :</h3>
                <Container>
                  <ListGroup>
                    {character.comments !== [] ? 
                    character.comments.map((comment, ctr) => { 
                      return  <ListGroup.Item key={ctr}>
                                <Container>
                                <Row>
                                  <div><img src={require("../../img/Avatar1.png")} width="75px" height="75px" alt="user avatar"/></div>
                                  <div className="ml-4 mt-2">
                                    <Row>{`${comment.timestamp.toString()}`}</Row>
                                    <Row><h6 className="mr-1" style={{"marginBottom":"0px", "display":"inline", "lineHeight":"1.5"}}>{comment.user}</h6> said:  </Row>
                                  </div>
                                </Row>
                                <Row>
                                  <div style={{"marginLeft":"75px", "paddingLeft":"10px"}}>{comment.comment}</div>
                                </Row>
                                </Container>
                              </ListGroup.Item>
                    }) : <div></div>}
                  </ListGroup>
                </Container> */}
              </Row>
            </Container>
        )
    }

    render() { 
        const selectedCharacter = this.state.name ? (<this.displayCharacter />) : 
                    <Container>
                      <Row>
                      <Spinner animation="border" className="force-center">
                          <span className="sr-only">Loading...</span>
                      </Spinner>
                      </Row>
                      <Row className="text-center">
                          <p className="text-center">This should not take more than 45 seconds</p>
                      </Row>
                    </Container>;
        return ( 
        <div>
            { this.state.id }
            {selectedCharacter}
        </div>
        );
    }
}
 
export default withRouter(ViewCharacter);