import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Card, Accordion, Button, Container, Col, Row, ListGroup, Spinner, Modal } from 'react-bootstrap';
import { UserContext } from '../../App'
import Comment from './subcomponents/Comments'
import axios from 'axios'
import target from '../helper/target'
class ViewCharacter extends Component {
    componentDidMount(){
        // console.log(this.props)
        let name = this.props.match.params.name;
        let tier = this.props.match.params.tier;
        this.setState({name})
        // console.log(tier + " " + name)
        if(name && tier)
          axios.get(`${target}/api/character/` + tier + "/" + name).then(res => {
            this.setState({didRespond: true, character: res.data.payload});
          }).catch(err=>console.log(err))
    }

    state = { 
        name: null,
        character: null,
        didRespond: false,
        deleteModal: false,
        deleteWarning: false,
        deleteResponse: false
    }

    backOnClick = () => {
      this.props.history.push('/Characters');
    }
    
    editOnClick = (name, tier) => {
      this.props.history.push(`/Characters/Edit/${tier}/${name}`);
    }

    deleteOnClick = () => {
      axios.delete(`${target}/${this.state.character._id}`,  {withCredentials: true})
        .then(res=>{
          // console.log(this.state.character._id)
          this.setState({deleteResponse: res.data.msg})
        })
    }

   showDeleteOnClick = () => {
      this.setState({deleteModal: true})
    }

    DeleteAfterFive = () => {
      
      setTimeout(()=>{
        this.setState({deleteWarning: true})
      }, 5000)

      return (<div className="text-center">
        <div>You are about to delete the character...</div>
        <Button 
        onClick={()=>this.deleteOnClick()}
        variant="danger" 
        disabled={!this.state.deleteWarning}>
          Delete
        </Button>
      </div>)
    }



    displayCharacter = () => {
      const user = React.useContext(UserContext)
      const character = this.state.character;
      if (character){
        const element = character.element.charAt(0).toUpperCase() + character.element.substring(1);
        const tier = character.tier.charAt(0).toUpperCase() + character.tier.substring(1);
        const role = character.role.charAt(0).toUpperCase() + character.role.substring(1);
        const type = character.type.charAt(0).toUpperCase() + character.type.substring(1);
        const position = character.position.charAt(0).toUpperCase() + character.position.substring(1);
        let image = null;
            try {
                image = require("./img/" + character.tier + "/" + character.name + ".JPG");
            } catch {
                image = require("./img/Generic.JPG");
            }
        return(
            <Container className="mt-4">
              <Row className="flex-row-reverse">
                <Button className="mr-4 mb-3" size="lg" variant="outline-secondary" onClick={this.backOnClick}>Back</Button>
                {user && user.access.toLowerCase() === "admin" ? <>
                <Button className="mr-4 mb-3" size="lg" variant="outline-info" onClick={() => this.editOnClick(character.name, character.tier)}>Edit</Button> 
                <Button className="mr-4 mb-3" size="lg" variant="outline-danger" onClick={() => {this.showDeleteOnClick()}}>Delete</Button> 
                
                </>: 
                <div></div>}
              </Row>
              <Row>
                <Col md={3} style={{}}>
                  <h4 className="text-center">{character.title}</h4>
                  <h2 className="text-center">{character.name}</h2>
                  <h4 className="text-center">{element}</h4>
                  <h5 className="text-center">{tier}</h5>
                  <div className="text-center">
                    <img className="force-center m-2 img-frame" draggable="false" src={image} alt={`${character.name}`}/>
                  </div>
                </Col>
                <Col>
                
                <Row>
                  <Accordion defaultActiveKey="0" style={{"width": "100%"}}>
                  <Card className="dark-mode-2">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Skills
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item className="dark-mode-2">
                            <div className="pre-wrap-me"><b>[Passive] {character.skills.passive.name}</b></div>
                            {character.skills.passive.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>{skill + "\n\n"}</div>
                            })}
                          </ListGroup.Item>
                          <ListGroup.Item className="dark-mode-2">
                            <div className="pre-wrap-me"><b>[Active 1] {character.skills.active1.name} - Cost: {character.skills.active1.cost}</b></div>
                            {character.skills.active1.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>{skill + "\n\n"}</div>
                            })}
                          </ListGroup.Item>
                          <ListGroup.Item className="dark-mode-2">
                            <div className="pre-wrap-me"><b>[Active 2] {character.skills.active2.name} - Cost: {character.skills.active2.cost}</b></div>
                            {character.skills.active2.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>{skill + "\n\n"}</div>
                            })}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="dark-mode-2">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Backstory
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body className="pre-wrap-me">{character.description}</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="dark-mode-2">
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
                          <Col md={6}>Role: &nbsp;&nbsp;&nbsp;&nbsp;{role}</Col>
                          <Col md={6}>Sex: &nbsp;&nbsp;&nbsp;&nbsp;{character.sex}</Col>
                        </Row>
                        <Row>
                          <Col md={6}>Nation: &nbsp;&nbsp;&nbsp;&nbsp;{character.nation}</Col>
                          <Col md={6}>Age: &nbsp;&nbsp;&nbsp;&nbsp;{character.age}</Col>
                        </Row>
                        <Row>
                          <Col md={6}>Race: &nbsp;&nbsp;&nbsp;&nbsp;{character.race}</Col>
                          <Col md={6}>Position: &nbsp;&nbsp;&nbsp;&nbsp;{position}</Col>
                        </Row>
                        <Row>
                          <Col md>Type: &nbsp;&nbsp;&nbsp;&nbsp;{type}</Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="dark-mode-2">
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
                                <ListGroup.Item key={count} className="dark-mode-2">
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
              {/* Comments section */}
              <Comment character={character._id}/>
              </Row>
            </Container>
        )
      } else return null
    }

    render() { 
        return ( 
        <div>
          {this.state.didRespond ? this.state.character === null ? "Bad Request. Make sure the character exists. If so, contact the developer..." : <this.displayCharacter /> : 
                  <Container className="mt-4">
                    <Row>
                    <Spinner animation="border" className="force-center">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <span>Sending request to the server. This should not take more than 45 seconds.</span>
                    </Row>
                  </Container>}
          <Modal show={this.state.deleteModal} onHide={()=>this.setState({deleteModal: false, deleteResponse: false})}>
            <Modal.Header closeButton>
            <Modal.Title>{this.state.deleteResponse ? "DELETE request" : "WARNING"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.state.deleteResponse ? this.state.deleteResponse : <this.DeleteAfterFive />}
            </Modal.Body>
          </Modal>
        </div>
        );
    }
}
 
export default withRouter(ViewCharacter);