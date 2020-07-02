import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Card, Accordion, Button, Container, Col, Row, ListGroup } from 'react-bootstrap';

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
              <Row>
                <Col sm={3} style={{}}>
                  <h2 className="text-center">{character.name}</h2>
                  <h4 className="text-center">{character.role}</h4>
                  <div className="text-center">
                    <img className="force-center m-2 img-frame" src={require("../../img/" + character.tier + "/" + character.name + ".JPG")} alt={`${character.name}`}/>
                  </div>
                </Col>
                <Col>
                <Accordion defaultActiveKey="0">
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
                        Bio
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
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
                          <Col>
                            <Card className="m-3">
                              <Card.Header className="text-center">
                                Role
                              </Card.Header>
                              <Card.Body className="text-center">
                                {character.role}
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col>
                            <Card className="m-3">
                              <Card.Header className="text-center">
                                Sex
                              </Card.Header>
                              <Card.Body className="text-center">
                                {character.sex}
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Card className="m-3">
                              <Card.Header className="text-center">
                                Nation
                              </Card.Header>
                              <Card.Body className="text-center">
                                {character.nation}
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col>
                            <Card className="m-3">
                              <Card.Header className="text-center">
                                Tier
                              </Card.Header>
                              <Card.Body className="text-center">
                                {character.tier}
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                          <Card className="m-3">
                            <Card.Header className="text-center">
                              Element
                            </Card.Header>
                            <Card.Body className="text-center">
                              {character.element}
                            </Card.Body>
                          </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                </Col>
              </Row>
            </Container>
        )
    }

    render() { 
        const selectedCharacter = this.state.name ? (<this.displayCharacter />) : (<div>loading...</div>);
        return ( 
        <div>
            { this.state.id }
            {selectedCharacter}
        </div>
        );
    }
}
 
export default withRouter(ViewCharacter);